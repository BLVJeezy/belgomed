import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Eye, Users, MousePointerClick, Clock, ArrowUpRight, ArrowDownRight,
  Globe, TrendingUp, Trophy, Loader2, Monitor, Smartphone, Tablet,
  BarChart3, Activity,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
  Legend,
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
  { name: "Desktop", value: 58, icon: Monitor },
  { name: "Mobile", value: 34, icon: Smartphone },
  { name: "Tablet", value: 8, icon: Tablet },
];

const DEVICE_COLORS = ["hsl(var(--primary))", "hsl(168 80% 45%)", "hsl(200 60% 50%)"];

const countryData = [
  { land: "België", bezoekers: 4210, vlag: "🇧🇪", pct: 41 },
  { land: "DR Congo", bezoekers: 3180, vlag: "🇨🇩", pct: 31 },
  { land: "Nederland", bezoekers: 1420, vlag: "🇳🇱", pct: 14 },
  { land: "Rwanda", bezoekers: 890, vlag: "🇷🇼", pct: 9 },
  { land: "Duitsland", bezoekers: 640, vlag: "🇩🇪", pct: 6 },
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

const tooltipStyle = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "10px",
  color: "hsl(var(--foreground))",
  fontSize: "12px",
  boxShadow: "0 8px 32px -4px hsl(var(--primary) / 0.15)",
  padding: "10px 14px",
};

const StatCard = ({ title, value, change, up, icon: Icon }: { title: string; value: string; change: string; up: boolean; icon: React.ElementType }) => (
  <Card className="glass-card border-border/20 hover:border-primary/30 transition-all duration-300 group">
    <CardContent className="p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <span className={`flex items-center gap-0.5 text-xs font-semibold px-2 py-1 rounded-full ${up ? "text-emerald-400 bg-emerald-400/10" : "text-red-400 bg-red-400/10"}`}>
          {up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {change}
        </span>
      </div>
      <p className="text-3xl font-bold text-foreground tracking-tight">{value}</p>
      <p className="text-xs text-muted-foreground mt-1.5 font-medium">{title}</p>
    </CardContent>
  </Card>
);

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
            wacht_op_vergunning: "Wacht op Vergunning",
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
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1440px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Website Analytics</h1>
          <p className="text-sm text-muted-foreground mt-0.5 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-primary" />
            Verkeer en bezoekersgedrag — belgomed.be
          </p>
        </div>
        <div className="flex gap-1 bg-secondary/40 backdrop-blur-sm rounded-xl p-1 self-start border border-border/20">
          {(["today", "7d", "30d"] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                period === p
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
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
          <StatCard key={s.title} {...s} />
        ))}
      </div>

      {/* Main chart + devices */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visitor trend */}
        <Card className="glass-card border-border/20 lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Bezoekerstrend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={visitorChartData} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradBezoekers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(180 100% 40%)" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="hsl(180 100% 40%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradPageviews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(168 80% 45%)" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="hsl(168 80% 45%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.3} />
                <XAxis dataKey="dag" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="bezoekers" stroke="hsl(180 100% 40%)" strokeWidth={2.5} fill="url(#gradBezoekers)" name="Bezoekers" dot={false} activeDot={{ r: 5, strokeWidth: 2, stroke: "hsl(180 100% 40%)", fill: "hsl(var(--card))" }} />
                <Area type="monotone" dataKey="pageviews" stroke="hsl(168 80% 45%)" strokeWidth={2} fill="url(#gradPageviews)" name="Pageviews" dot={false} strokeDasharray="6 3" activeDot={{ r: 4, strokeWidth: 2, stroke: "hsl(168 80% 45%)", fill: "hsl(var(--card))" }} />
                <Legend iconType="line" wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Devices */}
        <Card className="glass-card border-border/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Monitor className="w-4 h-4 text-primary" />
              Apparaten
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={52}
                  outerRadius={78}
                  paddingAngle={3}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {deviceData.map((_, i) => (
                    <Cell key={i} fill={DEVICE_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-2.5 w-full mt-3">
              {deviceData.map((d, i) => {
                const DeviceIcon = d.icon;
                return (
                  <div key={d.name} className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: DEVICE_COLORS[i] }} />
                      <DeviceIcon className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-xs text-foreground font-medium">{d.name}</span>
                    </div>
                    <span className="text-xs font-bold text-foreground">{d.value}%</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Second row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top pages */}
        <Card className="glass-card border-border/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              Top Pagina's
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topPages.map((p, i) => (
              <div key={p.page} className="group">
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-primary/60 w-5">{i + 1}.</span>
                    <span className="text-foreground font-medium truncate">{p.naam}</span>
                  </div>
                  <span className="text-muted-foreground text-xs font-semibold tabular-nums">{p.views.toLocaleString()}</span>
                </div>
                <div className="h-1.5 rounded-full bg-secondary/30 overflow-hidden ml-7">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{
                      width: `${p.pct}%`,
                      background: `linear-gradient(90deg, hsl(var(--primary)), hsl(168 80% 45%))`,
                    }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Countries */}
        <Card className="glass-card border-border/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" />
              Landen
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {countryData.map((c) => (
              <div key={c.land} className="flex items-center gap-3">
                <span className="text-xl leading-none">{c.vlag}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-foreground font-medium">{c.land}</span>
                    <span className="text-xs font-semibold text-muted-foreground tabular-nums">{c.bezoekers.toLocaleString()}</span>
                  </div>
                  <div className="h-1 rounded-full bg-secondary/30 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary/60 transition-all duration-500"
                      style={{ width: `${c.pct}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Hourly traffic */}
        <Card className="glass-card border-border/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              Verkeer per uur
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={230}>
              <BarChart data={hourlyData} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.3} />
                <XAxis dataKey="uur" stroke="hsl(var(--muted-foreground))" fontSize={10} interval={3} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="bezoekers" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Bezoekers" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Team Leaderboard */}
      <Card className="glass-card border-border/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            Sales Overzicht
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
                  <a
                    key={member.key}
                    href={`/admin/leads?assignee=${member.key}`}
                    className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-xl bg-secondary/15 border border-border/15 hover:bg-secondary/25 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer group"
                  >
                    {/* Rank + Avatar */}
                    <div className="flex items-center gap-3 min-w-[180px]">
                      <span className="text-lg w-7 text-center">{medals[i] ?? `#${i + 1}`}</span>
                      <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center text-xs font-bold text-primary group-hover:bg-primary/25 transition-colors">
                        {member.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{member.name}</p>
                        <p className="text-[11px] text-muted-foreground">{member.role}</p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex-1 flex flex-wrap items-center gap-4 sm:gap-6">
                      <div className="text-center">
                        <p className="text-lg font-bold text-foreground">{member.total}</p>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Totaal</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-primary">{member.active}</p>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Actief</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-emerald-400">{member.completed}</p>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Afgehandeld</p>
                      </div>

                      {/* Progress bar */}
                      <div className="flex-1 min-w-[100px]">
                        <div className="h-2 rounded-full bg-secondary/30 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700 ease-out"
                            style={{
                              width: `${(member.total / maxTotal) * 100}%`,
                              background: "linear-gradient(90deg, hsl(var(--primary)), hsl(168 80% 45%))",
                            }}
                          />
                        </div>
                      </div>

                      {/* Current activity */}
                      <div className="text-right min-w-[140px]">
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Bezig met</p>
                        <p className="text-xs font-semibold text-foreground">{member.currentStage}</p>
                      </div>
                    </div>
                  </a>
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
