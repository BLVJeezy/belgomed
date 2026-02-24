import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Download, RefreshCw, X, Eye, Search } from "lucide-react";

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

const stageConfig: Record<string, { label: string; color: string; bg: string; icon: string }> = {
  nieuw: { label: "Nieuw", color: "text-primary", bg: "bg-primary/10 border-primary/30", icon: "🆕" },
  in_behandeling: { label: "In Behandeling", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/30", icon: "⚙️" },
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
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const assigneeFilter = searchParams.get("assignee");

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    setLeads((data as Lead[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchLeads();
    const channel = supabase
      .channel("leads-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "leads" }, () => {
        fetchLeads();
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [fetchLeads]);

  const updateStage = async (id: string, newStage: string) => {
    await supabase.from("leads").update({ stage: newStage as any }).eq("id", id);
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, stage: newStage } : l)));
  };

  const updateAssignee = async (id: string, assignee: string) => {
    await supabase.from("leads").update({ assignee }).eq("id", id);
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, assignee } : l)));
  };

  const exportCSV = () => {
    const headers = ["Bedrijfsnaam", "Sector", "Land", "Stage", "Assignee", "Contact", "Email", "Datum"];
    const rows = filteredLeads.map((l) => [
      l.bedrijfsnaam, l.sector, l.land, stageConfig[l.stage]?.label ?? l.stage,
      teamMembers.find((t) => t.value === l.assignee)?.label ?? "Onverwerkt",
      l.contact_naam ?? "", l.contact_email ?? "",
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

  let filteredLeads = assigneeFilter ? leads.filter((l) => l.assignee === assigneeFilter) : leads;
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filteredLeads = filteredLeads.filter((l) =>
      l.bedrijfsnaam.toLowerCase().includes(q) ||
      (l.contact_naam?.toLowerCase().includes(q)) ||
      (l.contact_email?.toLowerCase().includes(q)) ||
      l.sector.toLowerCase().includes(q)
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1440px] mx-auto space-y-4">
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">Leads</h1>
          <p className="text-xs text-muted-foreground mt-0.5">{filteredLeads.length} resultaten</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={fetchLeads} className="border-border/30">
            <RefreshCw className="w-3.5 h-3.5" />
          </Button>
          <Button variant="outline" size="sm" onClick={exportCSV} className="border-border/30">
            <Download className="w-3.5 h-3.5 mr-1" /> CSV
          </Button>
        </div>
      </div>

      {/* Search + filter bar */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Zoek op naam, bedrijf, email..."
            className="w-full pl-9 pr-3 py-2 text-sm bg-secondary/30 border border-border/20 rounded-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
          />
        </div>
        {filterName && (
          <button onClick={clearFilter} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground bg-secondary/50 px-3 py-2 rounded-lg transition-colors border border-border/20">
            <span>Filter: <span className="text-primary font-medium">{filterName}</span></span>
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Lead cards */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <RefreshCw className="w-5 h-5 text-primary animate-spin" />
        </div>
      ) : filteredLeads.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-sm">Geen leads gevonden.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredLeads.map((lead) => (
            <div
              key={lead.id}
              className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 rounded-xl border border-border/15 bg-card/50 hover:bg-secondary/20 transition-colors"
            >
              {/* Lead info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="font-semibold text-foreground text-sm truncate">{lead.bedrijfsnaam}</h3>
                  <span className="text-[10px] font-bold bg-secondary/50 text-muted-foreground px-2 py-0.5 rounded-md flex-shrink-0">
                    {lead.sector}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  {lead.contact_naam && <span>{lead.contact_naam}</span>}
                  {lead.contact_email && <span className="text-muted-foreground/60"> · {lead.contact_email}</span>}
                </p>
              </div>



              {/* Date */}
              <span className="text-xs text-muted-foreground tabular-nums flex-shrink-0 hidden sm:block">
                {new Date(lead.created_at).toLocaleDateString("nl-BE")}
              </span>

              {/* View */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedLead(lead)}
                className="text-primary hover:text-primary hover:bg-primary/10 rounded-lg flex-shrink-0 h-8 w-8 p-0"
              >
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Lead detail modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setSelectedLead(null)}>
          <div className="bg-card p-6 max-w-lg w-full space-y-5 border border-border/20 rounded-2xl shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground">Lead Dossier</h2>
              <button onClick={() => setSelectedLead(null)} className="text-muted-foreground hover:text-foreground transition-colors w-8 h-8 rounded-lg hover:bg-secondary/50 flex items-center justify-center">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Bedrijf", value: selectedLead.bedrijfsnaam },
                  { label: "Sector", value: selectedLead.sector },
                  { label: "Contact", value: selectedLead.contact_naam ?? "—" },
                  { label: "Email", value: selectedLead.contact_email ?? "—" },
                  { label: "Land", value: selectedLead.land },
                  { label: "Datum", value: new Date(selectedLead.created_at).toLocaleString("nl-BE") },
                ].map((field) => (
                  <div key={field.label} className="bg-secondary/15 rounded-lg p-3">
                    <p className="text-muted-foreground text-[10px] font-medium uppercase tracking-wider mb-0.5">{field.label}</p>
                    <p className="text-foreground font-medium">{field.value}</p>
                  </div>
                ))}
              </div>
              {selectedLead.bericht && (
                <div>
                  <p className="text-muted-foreground text-[10px] font-medium uppercase tracking-wider mb-1">Bericht</p>
                  <div className="bg-secondary/15 rounded-lg p-4 text-foreground text-sm leading-relaxed">
                    {selectedLead.bericht}
                  </div>
                </div>
              )}
              <div className="flex items-center justify-between pt-3 border-t border-border/20">
                <span className={`text-xs font-semibold px-3 py-1.5 rounded-lg border ${stageConfig[selectedLead.stage]?.bg} ${stageConfig[selectedLead.stage]?.color}`}>
                  {stageConfig[selectedLead.stage]?.icon} {stageConfig[selectedLead.stage]?.label}
                </span>
                <span className="text-xs text-muted-foreground">
                  {teamMembers.find((t) => t.value === selectedLead.assignee)?.label ?? "Onverwerkt"}
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
