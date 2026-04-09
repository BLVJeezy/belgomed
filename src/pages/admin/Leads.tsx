import { useEffect, useState, useCallback } from "react";
import { getAdminClient } from "@/lib/adminBackend";
import { Button } from "@/components/ui/button";
import { Eye, RefreshCw, Trash2, Users, X } from "lucide-react";

type Lead = {
  id: string;
  bedrijfsnaam: string;
  sector: string;
  land: string;
  regio: string | null;
  stage: string;
  contact_email: string | null;
  contact_naam: string | null;
  telefoon: string | null;
  bericht: string | null;
  created_at: string;
};

const stageConfig: Record<string, {label: string;color: string;bg: string;icon: string;}> = {
  nieuw: { label: "Nieuw", color: "text-primary", bg: "bg-primary/10 border-primary/30", icon: "🆕" },
  in_behandeling: { label: "In Behandeling", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/30", icon: "⚙️" },
  wacht_op_vergunning: { label: "Wacht op Vergunning", color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/30", icon: "📋" },
  offerte_gestuurd: { label: "Offerte Gestuurd", color: "text-accent", bg: "bg-accent/10 border-accent/30", icon: "📨" },
  afgehandeld: { label: "Afgehandeld", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/30", icon: "✅" }
};

const Leads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const deleteLead = useCallback(async (id: string) => {
    setDeleting(id);
    const client = getAdminClient();
    if (!client) return;
    await client.from("leads").delete().eq("id", id);
    setLeads((prev) => prev.filter((l) => l.id !== id));
    if (selectedLead?.id === id) setSelectedLead(null);
    setDeleting(null);
  }, [selectedLead]);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    const client = getAdminClient();
    if (!client) { setLoading(false); return; }
    const { data } = await client.from("leads").select("*").order("created_at", { ascending: false });
    setLeads(data as Lead[] ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchLeads();
    const client = getAdminClient();
    if (!client) return;
    const channel = client
      .channel("leads-changes")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "leads" }, () => fetchLeads())
      .subscribe();
    return () => { client.removeChannel(channel); };
  }, [fetchLeads]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">Leads ({leads.length})</h1>
        <Button variant="outline" size="sm" onClick={fetchLeads}>
          <RefreshCw className="w-4 h-4 mr-1" /> Vernieuwen
        </Button>
      </div>

      {loading ?
      <div className="flex items-center justify-center py-16">
          <RefreshCw className="w-5 h-5 text-primary animate-spin" />
        </div> :
      leads.length === 0 ?
      <div className="text-center py-16">
          <Users className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">Geen leads gevonden.</p>
        </div> :

      <div className="space-y-2">
          {leads.map((lead) =>
        <div
          key={lead.id}
          className="flex items-center justify-between gap-4 rounded-xl border border-border/20 bg-card p-4">

              <div className="min-w-0">
                <p className="font-semibold text-foreground truncate">{lead.bedrijfsnaam}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {lead.sector} · {lead.land}{lead.regio ? ` — ${lead.regio}` : ""} · {new Date(lead.created_at).toLocaleDateString("nl-BE")}
                </p>
                </p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedLead(lead)}
              className="text-primary hover:text-primary hover:bg-primary/10">

                  <Eye className="w-4 h-4 mr-1" /> Bekijk
                </Button>
                <Button
              variant="ghost"
              size="sm"
              onClick={() => deleteLead(lead.id)}
              disabled={deleting === lead.id}
              className="text-destructive hover:text-destructive hover:bg-destructive/10">

                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
        )}
        </div>
      }

      {/* Detail modal */}
      {selectedLead &&
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setSelectedLead(null)}>
          <div className="bg-card p-6 max-w-lg w-full space-y-5 border border-border/20 rounded-2xl shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground">Lead Dossier</h2>
              <button onClick={() => setSelectedLead(null)} className="text-muted-foreground hover:text-foreground w-8 h-8 rounded-lg hover:bg-secondary/50 flex items-center justify-center">
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
              { label: "Telefoon", value: selectedLead.telefoon ?? "—" },
              { label: "Land", value: selectedLead.land }].
              map((field) =>
              <div key={field.label} className="bg-secondary/15 rounded-lg p-3">
                    <p className="text-muted-foreground text-[11px] font-medium uppercase tracking-wider mb-0.5">{field.label}</p>
                    <p className="text-foreground font-medium">{field.value}</p>
                  </div>
              )}
              </div>
              {selectedLead.bericht &&
            <div>
                  <p className="text-muted-foreground text-[11px] font-medium uppercase tracking-wider mb-1.5">Bericht</p>
                  <div className="bg-secondary/15 rounded-lg p-4 text-foreground text-sm leading-relaxed">{selectedLead.bericht}</div>
                </div>
            }
              <div className="flex items-center justify-between pt-3 border-t border-border/20">
                


                <span className="text-xs text-muted-foreground tabular-nums">
                  {new Date(selectedLead.created_at).toLocaleString("nl-BE")}
                </span>
              </div>
            </div>
          </div>
        </div>
      }
    </div>);

};

export default Leads;