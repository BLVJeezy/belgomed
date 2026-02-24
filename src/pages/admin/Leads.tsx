import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Download, RefreshCw, Bell, X, Eye, Users, FileText, ArrowRight, ChevronRight } from "lucide-react";

type Lead = {
  id: string;
  bedrijfsnaam: string;
  sector: string;
  land: string;
  status: string;
  stage: string;
  assignee: string | null;
  contact_email: string | null;
  contact_naam: string | null;
  telefoon: string | null;
  service_type: string | null;
  bericht: string | null;
  created_at: string;
};

const stageOrder = ["nieuw", "in_behandeling", "wacht_op_vergunning", "offerte_gestuurd", "afgehandeld"] as const;

const stageConfig: Record<string, { label: string; color: string; bg: string; icon: string }> = {
  nieuw: { label: "Nieuw", color: "text-primary", bg: "bg-primary/10 border-primary/30", icon: "🆕" },
  in_behandeling: { label: "In Behandeling", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/30", icon: "⚙️" },
  wacht_op_vergunning: { label: "Wacht op Vergunning", color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/30", icon: "📋" },
  offerte_gestuurd: { label: "Offerte Gestuurd", color: "text-accent", bg: "bg-accent/10 border-accent/30", icon: "📨" },
  afgehandeld: { label: "Afgehandeld", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/30", icon: "✅" },
};

const teamMembers = [
  { value: "dirk", label: "Dirk V." },
  { value: "sarah", label: "Sarah M." },
  { value: "jason", label: "Jason (Admin)" },
];

const Leads = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [newLeadAlert, setNewLeadAlert] = useState(false);
  const [newLeadCount, setNewLeadCount] = useState(0);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [stageFilter, setStageFilter] = useState<string | null>(null);
  const assigneeFilter = searchParams.get("assignee");

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    const fetched = (data as Lead[]) ?? [];
    setLeads(fetched);

    const nieuweLeads = fetched.filter((l) => l.stage === "nieuw");
    if (nieuweLeads.length > 0) {
      setNewLeadCount(nieuweLeads.length);
      setNewLeadAlert(true);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchLeads();
    const channel = supabase
      .channel("leads-changes")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "leads" }, () => {
        setNewLeadAlert(true);
        fetchLeads();
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [fetchLeads]);

  const updateStage = async (id: string, newStage: string) => {
    await supabase.from("leads").update({ stage: newStage as "nieuw" | "in_behandeling" | "wacht_op_vergunning" | "offerte_gestuurd" | "afgehandeld" }).eq("id", id);
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, stage: newStage } : l)));
  };

  const updateAssignee = async (id: string, assignee: string) => {
    await supabase.from("leads").update({ assignee }).eq("id", id);
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, assignee } : l)));
  };

  const exportCSV = () => {
    const headers = ["Bedrijfsnaam", "Sector", "Land", "Stage", "Assignee", "Contact", "Email", "Telefoon", "Datum"];
    const rows = leads.map((l) => [
      l.bedrijfsnaam, l.sector, l.land, stageConfig[l.stage]?.label ?? l.stage,
      teamMembers.find((t) => t.value === l.assignee)?.label ?? "Onverwerkt",
      l.contact_naam ?? "", l.contact_email ?? "", l.telefoon ?? "",
      new Date(l.created_at).toLocaleDateString("nl-BE"),
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `belgomed-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  const clearFilter = () => {
    searchParams.delete("assignee");
    setSearchParams(searchParams);
  };

  const filterName = assigneeFilter
    ? teamMembers.find((t) => t.value === assigneeFilter)?.label ?? assigneeFilter
    : null;

  // Apply filters
  let filteredLeads = assigneeFilter ? leads.filter((l) => l.assignee === assigneeFilter) : leads;
  if (stageFilter) filteredLeads = filteredLeads.filter((l) => l.stage === stageFilter);

  const pipelineCounts = Object.fromEntries(
    stageOrder.map((s) => [s, leads.filter((l) => (!assigneeFilter || l.assignee === assigneeFilter) && l.stage === s).length])
  );
  const totalActive = stageOrder.slice(0, -1).reduce((sum, s) => sum + (pipelineCounts[s] ?? 0), 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1440px] mx-auto">
      {/* Alerts */}
      {filterName && (
        <div className="flex items-center justify-between bg-primary/8 border border-primary/20 rounded-xl px-5 py-3">
          <span className="text-sm font-medium text-foreground">
            🔍 Filter actief: leads van <span className="text-primary font-semibold">{filterName}</span>
          </span>
          <button onClick={clearFilter} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground bg-secondary/50 px-3 py-1.5 rounded-lg transition-colors">
            <X className="w-3 h-3" /> Wis filter
          </button>
        </div>
      )}
      {newLeadAlert && (
        <div className="flex items-center justify-between bg-primary/8 border border-primary/20 rounded-xl px-5 py-3 animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
              <Bell className="w-4 h-4 text-primary animate-bounce" />
            </div>
            <span className="text-sm font-medium text-foreground">
              {newLeadCount} nieuwe lead{newLeadCount > 1 ? "s" : ""} ontvangen — bekijk en wijs toe.
            </span>
          </div>
          <button onClick={() => setNewLeadAlert(false)} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Active Leads Pipeline</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {totalActive} actieve leads · {pipelineCounts.afgehandeld ?? 0} afgehandeld
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full font-semibold border border-primary/20">
            Super-Admin: Jason
          </span>
          <Button variant="outline" size="sm" onClick={fetchLeads} className="border-border/30">
            <RefreshCw className="w-4 h-4 mr-1" /> Vernieuwen
          </Button>
          <Button variant="outline" size="sm" onClick={exportCSV} className="border-border/30">
            <Download className="w-4 h-4 mr-1" /> CSV
          </Button>
        </div>
      </div>

      {/* Visual Pipeline */}
      <div className="relative">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {stageOrder.map((key, i) => {
            const cfg = stageConfig[key];
            const count = pipelineCounts[key] ?? 0;
            const isActive = stageFilter === key;
            return (
              <button
                key={key}
                onClick={() => setStageFilter(isActive ? null : key)}
                className={`relative group transition-all duration-300 rounded-xl border p-4 text-left ${
                  isActive
                    ? `${cfg.bg} ring-2 ring-offset-1 ring-offset-background`
                    : "glass-card border-border/20 hover:border-border/40"
                }`}
                
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg leading-none">{cfg.icon}</span>
                  {i < stageOrder.length - 1 && (
                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40 hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 z-10" />
                  )}
                </div>
                <p className={`text-2xl font-bold ${isActive ? cfg.color : "text-foreground"}`}>{count}</p>
                <p className={`text-[11px] font-semibold mt-1 ${isActive ? cfg.color : "text-muted-foreground"}`}>{cfg.label}</p>
              </button>
            );
          })}
        </div>
        
      </div>

      {/* Leads table */}
      <Card className="glass-card border-border/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            {stageFilter ? `${stageConfig[stageFilter]?.label} — ` : ""}Alle Leads ({filteredLeads.length}{assigneeFilter ? ` van ${filterName}` : ""})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <RefreshCw className="w-5 h-5 text-primary animate-spin" />
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-muted-foreground/20 mx-auto mb-3" />
              <p className="text-muted-foreground text-sm font-medium">Geen leads gevonden.</p>
              <p className="text-muted-foreground text-xs mt-1">
                {stageFilter ? "Probeer een ander filter." : "Leads verschijnen hier zodra iemand het contactformulier invult."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-6">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/20">
                    <TableHead className="pl-6">Lead / Bedrijf</TableHead>
                    <TableHead>Sector</TableHead>
                    <TableHead>Behandeld door</TableHead>
                    <TableHead>Huidige Fase</TableHead>
                    <TableHead>Datum</TableHead>
                    <TableHead className="pr-6">Acties</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.map((lead) => (
                    <TableRow key={lead.id} className="border-border/10 hover:bg-secondary/10 transition-colors">
                      <TableCell className="pl-6">
                        <div className="font-semibold text-foreground">{lead.bedrijfsnaam}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {lead.contact_naam && <span>{lead.contact_naam}</span>}
                          {lead.contact_email && <span className="text-muted-foreground/70"> · {lead.contact_email}</span>}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs font-semibold bg-secondary/40 text-foreground px-2.5 py-1 rounded-lg">
                          {lead.sector}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={lead.assignee ?? "unassigned"}
                          onValueChange={(val) => updateAssignee(lead.id, val === "unassigned" ? "" : val)}
                        >
                          <SelectTrigger className="w-[140px] h-8 text-xs border-border/20 rounded-lg">
                            <SelectValue placeholder="Onverwerkt" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="unassigned">Onverwerkt</SelectItem>
                            {teamMembers.map((m) => (
                              <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={lead.stage}
                          onValueChange={(val) => updateStage(lead.id, val)}
                        >
                          <SelectTrigger className={`w-[165px] h-8 text-xs font-semibold border rounded-lg ${stageConfig[lead.stage]?.bg ?? ""} ${stageConfig[lead.stage]?.color ?? ""}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(stageConfig).map(([key, cfg]) => (
                              <SelectItem key={key} value={key}>
                                <span className="flex items-center gap-1.5">
                                  <span>{cfg.icon}</span> {cfg.label}
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-xs whitespace-nowrap tabular-nums">
                        {new Date(lead.created_at).toLocaleDateString("nl-BE")}
                      </TableCell>
                      <TableCell className="pr-6">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedLead(lead)}
                          className="text-primary hover:text-primary hover:bg-primary/10 rounded-lg"
                        >
                          <Eye className="w-4 h-4 mr-1" /> Bekijk
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Lead detail modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setSelectedLead(null)}>
          <div className="glass-card p-6 max-w-lg w-full space-y-5 border border-border/20 bg-card rounded-2xl shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground">Lead Dossier</h2>
              <button onClick={() => setSelectedLead(null)} className="text-muted-foreground hover:text-foreground transition-colors w-8 h-8 rounded-lg hover:bg-secondary/50 flex items-center justify-center">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Bedrijf", value: selectedLead.bedrijfsnaam },
                  { label: "Sector", value: selectedLead.sector },
                  { label: "Contact", value: selectedLead.contact_naam ?? "—" },
                  { label: "Email", value: selectedLead.contact_email ?? "—" },
                  { label: "Telefoon", value: selectedLead.telefoon ?? "—" },
                  { label: "Land", value: selectedLead.land },
                ].map((field) => (
                  <div key={field.label} className="bg-secondary/15 rounded-lg p-3">
                    <p className="text-muted-foreground text-[11px] font-medium uppercase tracking-wider mb-0.5">{field.label}</p>
                    <p className="text-foreground font-medium">{field.value}</p>
                  </div>
                ))}
              </div>
              {selectedLead.bericht && (
                <div>
                  <p className="text-muted-foreground text-[11px] font-medium uppercase tracking-wider mb-1.5">Bericht</p>
                  <div className="bg-secondary/15 rounded-lg p-4 text-foreground text-sm leading-relaxed">
                    {selectedLead.bericht}
                  </div>
                </div>
              )}
              <div className="flex items-center justify-between pt-3 border-t border-border/20">
                <span className={`text-xs font-semibold px-3 py-1.5 rounded-lg border ${stageConfig[selectedLead.stage]?.bg} ${stageConfig[selectedLead.stage]?.color}`}>
                  {stageConfig[selectedLead.stage]?.icon} {stageConfig[selectedLead.stage]?.label}
                </span>
                <span className="text-xs text-muted-foreground tabular-nums">
                  {new Date(selectedLead.created_at).toLocaleString("nl-BE")}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leads;
