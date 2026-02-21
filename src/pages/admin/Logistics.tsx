import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, MapPin, Thermometer, Clock } from "lucide-react";

const shipments = [
  { id: "BM-2026-001", route: "Brussel → Kinshasa", status: "In Transit", temp: "2.4°C", eta: "3 dagen" },
  { id: "BM-2026-002", route: "Antwerpen → Lubumbashi", status: "Customs", temp: "3.1°C", eta: "5 dagen" },
  { id: "BM-2026-003", route: "Brussel → Goma", status: "Delivered", temp: "2.8°C", eta: "Geleverd" },
  { id: "BM-2026-004", route: "Gent → Mbuji-Mayi", status: "Preparing", temp: "—", eta: "7 dagen" },
];

const statusColor: Record<string, string> = {
  "In Transit": "bg-primary/20 text-primary",
  Customs: "bg-yellow-500/20 text-yellow-400",
  Delivered: "bg-green-500/20 text-green-400",
  Preparing: "bg-muted text-muted-foreground",
};

const Logistics = () => (
  <div className="p-8 space-y-6">
    <h1 className="text-2xl font-bold text-foreground">Logistics</h1>
    <p className="text-sm text-muted-foreground">Cold-chain shipment tracking</p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {shipments.map((s) => (
        <Card key={s.id} className="glass-card border-border/30">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-mono text-primary">{s.id}</CardTitle>
            <span className={`text-xs font-semibold uppercase px-3 py-1 rounded-full ${statusColor[s.status]}`}>
              {s.status}
            </span>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-foreground">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              {s.route}
            </div>
            <div className="flex gap-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Thermometer className="w-4 h-4" /> {s.temp}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" /> {s.eta}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default Logistics;
