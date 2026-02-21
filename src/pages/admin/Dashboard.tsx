import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Thermometer, Package, TrendingUp, Users, ShieldCheck } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

const mockChartData = [
  { month: "Jan", exportVolume: 85, gdpCompliance: 99.2 },
  { month: "Feb", exportVolume: 92, gdpCompliance: 99.5 },
  { month: "Mar", exportVolume: 102, gdpCompliance: 99.3 },
  { month: "Apr", exportVolume: 110, gdpCompliance: 99.7 },
  { month: "May", exportVolume: 118, gdpCompliance: 99.8 },
  { month: "Jun", exportVolume: 128, gdpCompliance: 99.8 },
];

type Period = "daily" | "weekly" | "monthly";

const statsConfig: Record<Period, { label: string; stats: { title: string; value: string; sub: string; icon: React.ElementType }[] }> = {
  daily: {
    label: "Dagelijks",
    stats: [
      { title: "Nieuwe Offertes", value: "7", sub: "+3 vs gisteren", icon: FileText },
      { title: "Cold-chain Stabiliteit", value: "99.8%", sub: "Alle zones stabiel", icon: Thermometer },
    ],
  },
  weekly: {
    label: "Wekelijks",
    stats: [
      { title: "Export Volume (DRC)", value: "128.5 Ton", sub: "+12% vs vorige week", icon: Package },
      { title: "Nieuwe Leads", value: "42", sub: "+8 vs vorige week", icon: Users },
    ],
  },
  monthly: {
    label: "Maandelijks",
    stats: [
      { title: "Omzetgroei", value: "+18.2%", sub: "vs vorige maand", icon: TrendingUp },
      { title: "Partner Acquisitie", value: "5 nieuw", sub: "3 DRC, 1 RW, 1 BU", icon: Users },
    ],
  },
};

const Dashboard = () => {
  const [period, setPeriod] = useState<Period>("weekly");
  const [leadCount, setLeadCount] = useState(0);

  useEffect(() => {
    const fetchLeadCount = async () => {
      const { count } = await supabase
        .from("leads")
        .select("*", { count: "exact", head: true });
      setLeadCount(count ?? 0);
    };
    fetchLeadCount();
  }, []);

  const currentStats = statsConfig[period];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Operational Overview</h1>
          <p className="text-sm text-muted-foreground">Welkom terug, Jason</p>
        </div>
        <div className="flex gap-1 bg-secondary/50 rounded-lg p-1">
          {(["daily", "weekly", "monthly"] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-md text-xs font-medium uppercase tracking-wider transition-colors ${
                period === p
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {statsConfig[p].label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentStats.stats.map((stat) => (
          <Card key={stat.title} className="glass-card border-border/30">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className="w-5 h-5 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-primary mt-1">{stat.sub}</p>
            </CardContent>
          </Card>
        ))}
        <Card className="glass-card border-border/30">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">GDP Compliance</CardTitle>
            <ShieldCheck className="w-5 h-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground">99.8%</p>
            <p className="text-xs text-primary mt-1">Alle normen voldaan</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card className="glass-card border-border/30">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">Export Volume vs GDP Compliance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={mockChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(180 20% 18%)" />
              <XAxis dataKey="month" stroke="hsl(180 15% 55%)" fontSize={12} />
              <YAxis yAxisId="left" stroke="hsl(180 15% 55%)" fontSize={12} />
              <YAxis yAxisId="right" orientation="right" stroke="hsl(180 15% 55%)" fontSize={12} domain={[98, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(180 30% 10%)",
                  border: "1px solid hsl(180 20% 18%)",
                  borderRadius: "8px",
                  color: "hsl(180 20% 95%)",
                }}
              />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="exportVolume"
                stroke="hsl(180 100% 40%)"
                strokeWidth={2}
                dot={{ fill: "hsl(180 100% 40%)", r: 4 }}
                name="Export Volume (Ton)"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="gdpCompliance"
                stroke="hsl(168 100% 45%)"
                strokeWidth={2}
                dot={{ fill: "hsl(168 100% 45%)", r: 4 }}
                name="GDP Compliance (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
