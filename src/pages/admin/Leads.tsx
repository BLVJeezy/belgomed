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
import { Download, RefreshCw, Bell, X, Eye, Users, FileText } from "lucide-react";

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

const stageConfig: Record<string, { label: string; color: string }> = {
  nieuw: { label: "Nieuw", color: "bg-primary/20 text-primary" },
  in_behandeling: { label: "In Behandeling", color: "bg-blue-500/20 text-blue-400" },
  wacht_op_vergunning: { label: "Wacht op FAGG", color: "bg-yellow-500/20 text-yellow-400" },
  offerte_gestuurd: { label: "Offerte Gestuurd", color: "bg-accent/20 text-primary" },
  afgehandeld: { label: "Afgehandeld", color: "bg-green-500/20 text-green-400" },
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

    // Real-time subscription for new leads
    const channel = supabase
      .channel("leads-changes")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "leads" }, () => {
        setNewLeadAlert(true);
        fetchLeads();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchLeads]);

  const updateStage = async (id: string, newStage: string) => {
    await supabase.from("leads").update({ stage: newStage as "nieuw" | "in_behandeling" | "wacht_op_vergunning" | "offerte_gestuurd" | "afgehandeld" }).eq("id", id);
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, stage: newStage } : l))
    );
  };

  const updateAssignee = async (id: string, assignee: string) => {
    await supabase.from("leads").update({ assignee }).eq("id", id);
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, assignee } : l))
    );
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

  const filteredLeads = assigneeFilter
    ? leads.filter((l) => l.assignee === assigneeFilter)
    : leads;

  const pipelineCounts = {
    nieuw: filteredLeads.filter((l) => l.stage === "nieuw").length,
    in_behandeling: filteredLeads.filter((l) => l.stage === "in_behandeling").length,
    wacht_op_vergunning: filteredLeads.filter((l) => l.stage === "wacht_op_vergunning").length,
    offerte_gestuurd: filteredLeads.filter((l) => l.stage === "offerte_gestuurd").length,
    afgehandeld: filteredLeads.filter((l) => l.stage === "afgehandeld").length,
  };

  const clearFilter = () => {
    searchParams.delete("assignee");
    setSearchParams(searchParams);
  };

  const filterName = assigneeFilter
    ? teamMembers.find((t) => t.value === assigneeFilter)?.label ?? assigneeFilter
    : null;

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1400px]">
      {/* Filter banner */}
      {filterName && (
        <div className="flex items-center justify-between bg-primary/10 border border-primary/30 rounded-lg px-5 py-3">
          <span className="text-sm font-medium text-foreground">
            🔍 Filter actief: leads van <span className="text-primary font-semibold">{filterName}</span>
          </span>
          <button onClick={clearFilter} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground bg-secondary/50 px-3 py-1.5 rounded-md">
            <X className="w-3 h-3" /> Wis filter
          </button>
        </div>
      )}
      {newLeadAlert && (
        <div className="flex items-center justify-between bg-primary/10 border border-primary/30 rounded-lg px-5 py-3 animate-in fade-in">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-primary animate-bounce" />
            <span className="text-sm font-medium text-foreground">
              🔔 {newLeadCount} nieuwe lead{newLeadCount > 1 ? "s" : ""} ontvangen — bekijk en wijs toe.
            </span>
          </div>
          <button onClick={() => setNewLeadAlert(false)} className="text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Active Leads Pipeline</h1>
          <p className="text-sm text-muted-foreground">
            Beheer aanvragen en wijs verantwoordelijken toe
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full font-medium">
            Super-Admin Mode: Jason
          </span>
          <Button variant="outline" size="sm" onClick={fetchLeads}>
            <RefreshCw className="w-4 h-4 mr-1" /> Vernieuwen
          </Button>
          <Button variant="outline" size="sm" onClick={exportCSV}>
            <Download className="w-4 h-4 mr-1" /> CSV
          </Button>
        </div>
      </div>

      {/* Pipeline summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {Object.entries(stageConfig).map(([key, cfg]) => (
          <Card key={key} className="glass-card border-border/30">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{pipelineCounts[key as keyof typeof pipelineCounts]}</p>
              <p className={`text-xs font-medium mt-1 ${cfg.color} px-2 py-0.5 rounded-full inline-block`}>
                {cfg.label}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Leads table */}
      <Card className="glass-card border-border/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-foreground flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Alle Leads ({filteredLeads.length}{assigneeFilter ? ` van ${filterName}` : ""})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground text-sm py-8 text-center">Laden...</p>
          ) : filteredLeads.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">Nog geen leads ontvangen.</p>
              <p className="text-muted-foreground text-xs mt-1">Leads verschijnen hier zodra iemand het contactformulier invult.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/30">
                    <TableHead>Lead / Bedrijf</TableHead>
                    <TableHead>Sector</TableHead>
                    <TableHead>Behandeld door</TableHead>
                    <TableHead>Huidige Fase</TableHead>
                    <TableHead>Datum</TableHead>
                    <TableHead>Acties</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.map((lead) => (
                    <TableRow key={lead.id} className="border-border/20">
                      <TableCell>
                        <div className="font-medium text-foreground">{lead.bedrijfsnaam}</div>
                        <div className="text-xs text-muted-foreground">
                          {lead.contact_naam && <span>{lead.contact_naam}</span>}
                          {lead.contact_email && <span> · {lead.contact_email}</span>}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs font-medium bg-secondary/50 text-secondary-foreground px-2 py-1 rounded">
                          {lead.sector}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={lead.assignee ?? "unassigned"}
                          onValueChange={(val) => updateAssignee(lead.id, val === "unassigned" ? "" : val)}
                        >
                          <SelectTrigger className="w-[140px] h-8 text-xs border-border/30">
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
                          <SelectTrigger className={`w-[160px] h-8 text-xs font-semibold border-0 ${stageConfig[lead.stage]?.color ?? ""}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(stageConfig).map(([key, cfg]) => (
                              <SelectItem key={key} value={key}>{cfg.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-xs whitespace-nowrap">
                        {new Date(lead.created_at).toLocaleDateString("nl-BE")}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedLead(lead)}
                          className="text-primary hover:text-primary"
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
          <div className="glass-card p-6 max-w-lg w-full space-y-4 border border-border/30 bg-card" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground">Lead Dossier</h2>
              <button onClick={() => setSelectedLead(null)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-muted-foreground text-xs">Bedrijf</p>
                  <p className="text-foreground font-medium">{selectedLead.bedrijfsnaam}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Sector</p>
                  <p className="text-foreground">{selectedLead.sector}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Contact</p>
                  <p className="text-foreground">{selectedLead.contact_naam ?? "—"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Email</p>
                  <p className="text-foreground">{selectedLead.contact_email ?? "—"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Telefoon</p>
                  <p className="text-foreground">{selectedLead.telefoon ?? "—"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Land</p>
                  <p className="text-foreground">{selectedLead.land}</p>
                </div>
              </div>
              {selectedLead.bericht && (
                <div>
                  <p className="text-muted-foreground text-xs mb-1">Bericht</p>
                  <div className="bg-secondary/30 rounded-lg p-3 text-foreground text-sm">
                    {selectedLead.bericht}
                  </div>
                </div>
              )}
              <div className="flex items-center justify-between pt-2 border-t border-border/30">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${stageConfig[selectedLead.stage]?.color}`}>
                  {stageConfig[selectedLead.stage]?.label}
                </span>
                <span className="text-xs text-muted-foreground">
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
