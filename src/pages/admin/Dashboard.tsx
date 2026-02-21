import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Eye, Users, MousePointerClick, Clock, ArrowUpRight, ArrowDownRight,
  Globe, Smartphone, Monitor, TrendingUp, Trophy, Loader2,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";

type Period = "today" | "7d" | "30d";

const trafficData: Record<Period, { label: string; visitors: string; change: string; up: boolean; pageviews: string; pvChange: string; pvUp: boolean; bounce: string; bChange: string; bUp: boolean; avgTime: string; tChange: string; tUp: boolean }> = {
  today: {
    label: "Vandaag",
    visitors: "342", change: "+18%", up: true,
    pageviews: "1,247", pvChange: "+12%", pvUp: true,
    bounce: "38%", bChange: "-3%", bUp: true,
    avgTime: "2m 45s", tChange: "+8%", tUp: true,
  },
  "7d": {
    label: "7 Dagen",
    visitors: "2,841", change: "+24%", up: true,
    pageviews: "9,632", pvChange: "+19%", pvUp: true,
    bounce: "41%", bChange: "+2%", bUp: false,
    avgTime: "2m 32s", tChange: "+5%", tUp: true,
  },
  "30d": {
    label: "30 Dagen",
    visitors: "11,429", change: "+31%", up: true,
    pageviews: "38,291", pvChange: "+27%", pvUp: true,
    bounce: "39%", bChange: "-4%", bUp: true,
    avgTime: "2m 51s", tChange: "+11%", tUp: true,
  },
};

const visitorChartData = [
  { dag: "Ma", bezoekers: 312, pageviews: 890 },
  { dag: "Di", bezoekers: 428, pageviews: 1240 },
  { dag: "Wo", bezoekers: 389, pageviews: 1050 },
  { dag: "Do", bezoekers: 502, pageviews: 1480 },
  { dag: "Vr", bezoekers: 467, pageviews: 1320 },
  { dag: "Za", bezoekers: 285, pageviews: 720 },
  { dag: "Zo", bezoekers: 198, pageviews: 530 },
];

const topPages = [
  { page: "/", naam: "Homepage", views: 4821, pct: 38 },
  { page: "/diensten", naam: "Onze Diensten", views: 2103, pct: 17 },
  { page: "/contact", naam: "Contact / Offerte", views: 1847, pct: 15 },
  { page: "/producten", naam: "Producten", views: 1392, pct: 11 },
  { page: "/licenties", naam: "Licenties & GDP", views: 982, pct: 8 },
];

const deviceData = [
  { name: "Desktop", value: 58, color: "hsl(180 100% 40%)" },
  { name: "Mobile", value: 34, color: "hsl(168 100% 45%)" },
  { name: "Tablet", value: 8, color: "hsl(180 40% 30%)" },
];

const countryData = [
  { land: "België", bezoekers: 4210, vlag: "🇧🇪" },
  { land: "DR Congo", bezoekers: 3180, vlag: "🇨🇩" },
  { land: "Nederland", bezoekers: 1420, vlag: "🇳🇱" },
  { land: "Rwanda", bezoekers: 890, vlag: "🇷🇼" },
  { land: "Duitsland", bezoekers: 640, vlag: "🇩🇪" },
];

const hourlyData = Array.from({ length: 24 }, (_, i) => ({
  uur: `${i.toString().padStart(2, "0")}:00`,
  bezoekers: Math.round(15 + Math.random() * 45 + (i >= 9 && i <= 17 ? 30 : 0)),
}));

const teamInfo: Record<string, { name: string; role: string; avatar: string }> = {
  dirk: { name: "Dirk V.", role: "Sales Manager", avatar: "DV" },
  sarah: { name: "Sarah M.", role: "Account Executive", avatar: "SM" },
  jason: { name: "Jason B.", role: "Super-Admin", avatar: "JB" },
};

type TeamMemberStats = {
  key: string;
  name: string;
  role: string;
  avatar: string;
  total: number;
  active: number;
  completed: number;
  currentStage: string;
};

const Dashboard = () => {
  const [period, setPeriod] = useState<Period>("7d");
  const [teamStats, setTeamStats] = useState<TeamMemberStats[]>([]);
  const [teamLoading, setTeamLoading] = useState(true);
  const stats = trafficData[period];

  useEffect(() => {
    const fetchTeamStats = async () => {
      setTeamLoading(true);
      const { data: leads } = await supabase.from("leads").select("assignee, stage");

      if (leads) {
        const teamData = Object.entries(teamInfo).map(([key, info]) => {
          const memberLeads = leads.filter((l) => l.assignee === key);
          const active = memberLeads.filter((l) => l.stage !== "afgehandeld").length;
          const completed = memberLeads.filter((l) => l.stage === "afgehandeld").length;
          const activeLead = memberLeads.find((l) => l.stage !== "afgehandeld");
          const stageLabels: Record<string, string> = {
            nieuw: "Nieuw",
            in_behandeling: "In Behandeling",
            wacht_op_vergunning: "Wacht op FAGG",
            offerte_gestuurd: "Offerte Gestuurd",
            afgehandeld: "Afgehandeld",
          };
          return {
            key,
            ...info,
            total: memberLeads.length,
            active,
            completed,
            currentStage: activeLead ? stageLabels[activeLead.stage] ?? activeLead.stage : "Geen actieve leads",
          };
        });
        teamData.sort((a, b) => b.total - a.total);
        setTeamStats(teamData);
      }
      setTeamLoading(false);
    };
    fetchTeamStats();
  }, []);

  const statCards = [
    { title: "Bezoekers", value: stats.visitors, change: stats.change, up: stats.up, icon: Users },
    { title: "Pageviews", value: stats.pageviews, change: stats.pvChange, up: stats.pvUp, icon: Eye },
    { title: "Bounce Rate", value: stats.bounce, change: stats.bChange, up: stats.bUp, icon: MousePointerClick },
    { title: "Gem. Sessieduur", value: stats.avgTime, change: stats.tChange, up: stats.tUp, icon: Clock },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1400px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Website Analytics</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Verkeer en bezoekersgedrag — belgomed.be</p>
        </div>
        <div className="flex gap-1 bg-secondary/50 rounded-lg p-1 self-start">
          {(["today", "7d", "30d"] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-md text-xs font-medium transition-colors ${
                period === p
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {trafficData[p].label}
            </button>
          ))}
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s) => (
          <Card key={s.title} className="glass-card border-border/30">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <s.icon className="w-5 h-5 text-primary/70" />
                <span className={`flex items-center gap-0.5 text-xs font-medium ${s.up ? "text-green-400" : "text-red-400"}`}>
                  {s.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {s.change}
                </span>
              </div>
              <p className="text-2xl lg:text-3xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main chart + devices */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visitor trend */}
        <Card className="glass-card border-border/30 lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-foreground flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Bezoekerstrend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={visitorChartData}>
                <defs>
                  <linearGradient id="colorBezoekers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(180 100% 40%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(180 100% 40%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(180 20% 18%)" />
                <XAxis dataKey="dag" stroke="hsl(180 15% 55%)" fontSize={12} />
                <YAxis stroke="hsl(180 15% 55%)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(180 30% 10%)",
                    border: "1px solid hsl(180 20% 18%)",
                    borderRadius: "8px",
                    color: "hsl(180 20% 95%)",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="bezoekers"
                  stroke="hsl(180 100% 40%)"
                  strokeWidth={2}
                  fill="url(#colorBezoekers)"
                  name="Bezoekers"
                />
                <Line
                  type="monotone"
                  dataKey="pageviews"
                  stroke="hsl(168 100% 45%)"
                  strokeWidth={2}
                  dot={false}
                  strokeDasharray="5 5"
                  name="Pageviews"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Devices */}
        <Card className="glass-card border-border/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-foreground flex items-center gap-2">
              <Monitor className="w-4 h-4 text-primary" />
              Apparaten
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {deviceData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(180 30% 10%)",
                    border: "1px solid hsl(180 20% 18%)",
                    borderRadius: "8px",
                    color: "hsl(180 20% 95%)",
                    fontSize: "12px",
                  }}
                  formatter={(value: number) => `${value}%`}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-2">
              {deviceData.map((d) => (
                <div key={d.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                  {d.name} {d.value}%
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom row: Top pages + Countries + Hourly */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top pages */}
        <Card className="glass-card border-border/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-foreground">Top Pagina's</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topPages.map((p) => (
              <div key={p.page} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground truncate mr-2">{p.naam}</span>
                  <span className="text-muted-foreground text-xs whitespace-nowrap">{p.views.toLocaleString()}</span>
                </div>
                <div className="h-1.5 rounded-full bg-secondary/50 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                    style={{ width: `${p.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Countries */}
        <Card className="glass-card border-border/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-foreground flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" />
              Landen
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {countryData.map((c) => (
              <div key={c.land} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-lg">{c.vlag}</span>
                  <span className="text-sm text-foreground">{c.land}</span>
                </div>
                <span className="text-sm font-medium text-muted-foreground">{c.bezoekers.toLocaleString()}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Hourly traffic */}
        <Card className="glass-card border-border/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-foreground flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-primary" />
              Verkeer per uur
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(180 20% 18%)" />
                <XAxis
                  dataKey="uur"
                  stroke="hsl(180 15% 55%)"
                  fontSize={10}
                  interval={3}
                />
                <YAxis stroke="hsl(180 15% 55%)" fontSize={10} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(180 30% 10%)",
                    border: "1px solid hsl(180 20% 18%)",
                    borderRadius: "8px",
                    color: "hsl(180 20% 95%)",
                    fontSize: "12px",
                  }}
                />
                <Bar
                  dataKey="bezoekers"
                  fill="hsl(180 100% 40%)"
                  radius={[3, 3, 0, 0]}
                  name="Bezoekers"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Team Leaderboard */}
      <Card className="glass-card border-border/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-foreground flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            Team Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          {teamLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-5 h-5 text-primary animate-spin" />
            </div>
          ) : (
            <div className="space-y-3">
              {teamStats.map((member, i) => {
                const medals = ["🥇", "🥈", "🥉"];
                const maxTotal = Math.max(...teamStats.map((m) => m.total), 1);
                return (
                  <div key={member.key} className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-lg bg-secondary/20 border border-border/20">
                    {/* Rank + Avatar */}
                    <div className="flex items-center gap-3 min-w-[180px]">
                      <span className="text-lg w-7 text-center">{medals[i] ?? `#${i + 1}`}</span>
                      <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                        {member.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{member.name}</p>
                        <p className="text-[11px] text-muted-foreground">{member.role}</p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex-1 flex flex-wrap items-center gap-4 sm:gap-6">
                      <div className="text-center">
                        <p className="text-lg font-bold text-foreground">{member.total}</p>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Totaal</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-primary">{member.active}</p>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Actief</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-green-400">{member.completed}</p>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Afgehandeld</p>
                      </div>

                      {/* Progress bar */}
                      <div className="flex-1 min-w-[100px]">
                        <div className="h-2 rounded-full bg-secondary/50 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                            style={{ width: `${(member.total / maxTotal) * 100}%` }}
                          />
                        </div>
                      </div>

                      {/* Current activity */}
                      <div className="text-right min-w-[140px]">
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Bezig met</p>
                        <p className="text-xs font-medium text-foreground">{member.currentStage}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
