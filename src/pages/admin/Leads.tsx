import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Download, RefreshCw } from "lucide-react";

type Lead = {
  id: string;
  bedrijfsnaam: string;
  sector: string;
  land: string;
  status: string;
  contact_email: string | null;
  contact_naam: string | null;
  created_at: string;
};

const statusColors: Record<string, string> = {
  new: "bg-primary/20 text-primary",
  pending: "bg-yellow-500/20 text-yellow-400",
  qualified: "bg-green-500/20 text-green-400",
  closed: "bg-muted text-muted-foreground",
};

const Leads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    setLeads((data as Lead[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    await supabase.from("leads").update({ status: newStatus as "new" | "pending" | "qualified" | "closed" }).eq("id", id);
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
    );
  };

  const exportCSV = () => {
    const headers = ["Bedrijfsnaam", "Sector", "Land", "Status", "Contact", "Email", "Datum"];
    const rows = leads.map((l) => [
      l.bedrijfsnaam, l.sector, l.land, l.status,
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

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Lead Management</h1>
          <p className="text-sm text-muted-foreground">
            {leads.length} leads totaal
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={fetchLeads}>
            <RefreshCw className="w-4 h-4 mr-1" /> Vernieuwen
          </Button>
          <Button variant="outline" size="sm" onClick={exportCSV}>
            <Download className="w-4 h-4 mr-1" /> CSV Export
          </Button>
        </div>
      </div>

      <Card className="glass-card border-border/30">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">Recente Offerte Aanvragen</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground text-sm py-8 text-center">Laden...</p>
          ) : leads.length === 0 ? (
            <p className="text-muted-foreground text-sm py-8 text-center">Geen leads gevonden.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-border/30">
                  <TableHead>Bedrijf</TableHead>
                  <TableHead>Sector</TableHead>
                  <TableHead>Land</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Datum</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead) => (
                  <TableRow key={lead.id} className="border-border/20">
                    <TableCell className="font-medium text-foreground">{lead.bedrijfsnaam}</TableCell>
                    <TableCell className="text-muted-foreground">{lead.sector}</TableCell>
                    <TableCell className="text-muted-foreground">{lead.land}</TableCell>
                    <TableCell>
                      <div className="text-sm text-foreground">{lead.contact_naam ?? "—"}</div>
                      <div className="text-xs text-muted-foreground">{lead.contact_email ?? ""}</div>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={lead.status}
                        onValueChange={(val) => updateStatus(lead.id, val)}
                      >
                        <SelectTrigger className={`w-[130px] h-8 text-xs font-semibold uppercase border-0 ${statusColors[lead.status] ?? ""}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">Nieuw</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="qualified">Qualified</SelectItem>
                          <SelectItem value="closed">Gesloten</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {new Date(lead.created_at).toLocaleDateString("nl-BE")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Leads;
