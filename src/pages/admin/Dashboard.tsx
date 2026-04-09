import { useState, useEffect, useMemo } from "react";
import { getAdminClient } from "@/lib/adminBackend";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Eye, Users, Clock,
  Globe, TrendingUp, Loader2, Monitor, Smartphone, Tablet,
  BarChart3, Activity, MapPin,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
  Legend,
} from "recharts";

type Period = "today" | "7d" | "30d";

type PageView = {
  id: string;
  path: string;
  device_type: string;
  country: string | null;
  country_code: string | null;
  region: string | null;
  ip_hash: string | null;
  session_id: string | null;
  created_at: string;
};


const DEVICE_COLORS = ["hsl(var(--primary))", "hsl(168 80% 45%)", "hsl(200 60% 50%)"];

const tooltipStyle = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "10px",
  color: "hsl(var(--foreground))",
  fontSize: "12px",
  boxShadow: "0 8px 32px -4px hsl(var(--primary) / 0.15)",
  padding: "10px 14px",
};

const COUNTRY_FLAGS: Record<string, string> = {
  Belgium: "🇧🇪", "DR Congo": "🇨🇩", Congo: "🇨🇩", Netherlands: "🇳🇱",
  "The Netherlands": "🇳🇱",
  Rwanda: "🇷🇼", Germany: "🇩🇪", France: "🇫🇷", "United States": "🇺🇸",
  "United Kingdom": "🇬🇧", Burundi: "🇧🇮", Uganda: "🇺🇬", Tanzania: "🇹🇿",
  Ireland: "🇮🇪", Italy: "🇮🇹", Luxembourg: "🇱🇺", Spain: "🇪🇸",
};

function getDaysAgoUTC(days: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - days);
  d.setUTCHours(0, 0, 0, 0);
  return d.toISOString();
}

const periodLabels: Record<Period, string> = {
  today: "Vandaag",
  "7d": "7 Dagen",
  "30d": "30 Dagen",
};

const StatCard = ({ title, value, icon: Icon, loading }: { title: string; value: string; icon: React.ElementType; loading?: boolean }) => (
  <Card className="glass-card border-border/20 hover:border-primary/30 transition-all duration-300 group">
    <CardContent className="p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <Icon className="w-5 h-5 text-primary" />
        </div>
      </div>
      {loading ? (
        <Loader2 className="w-5 h-5 text-primary animate-spin" />
      ) : (
        <>
          <p className="text-3xl font-bold text-foreground tracking-tight">{value}</p>
          <p className="text-xs text-muted-foreground mt-1.5 font-medium">{title}</p>
        </>
      )}
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const [period, setPeriod] = useState<Period>("7d");
  const [pageViews, setPageViews] = useState<PageView[]>([]);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);

  // Fetch page views with auto-refresh
  useEffect(() => {
    let isFirst = true;
    const fetchPageViews = async () => {
      if (isFirst) setAnalyticsLoading(true);
      const since = period === "today" ? getDaysAgoUTC(0) : period === "7d" ? getDaysAgoUTC(7) : getDaysAgoUTC(30);

      const client = getAdminClient();
      if (!client) { setAnalyticsLoading(false); return; }
      const { data, error } = await client
        .from("page_views")
        .select("id, path, device_type, country, country_code, region, ip_hash, session_id, created_at")
        .gte("created_at", since)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setPageViews(data as PageView[]);
      }
      if (isFirst) { setAnalyticsLoading(false); isFirst = false; }
    };
    fetchPageViews();
    const interval = setInterval(fetchPageViews, 30_000);
    return () => clearInterval(interval);
  }, [period]);


  // Computed analytics
  const analytics = useMemo(() => {
    const totalPageviews = pageViews.length;
    const uniqueVisitors = new Set(pageViews.map((v) => v.ip_hash || v.session_id || v.id)).size;
    const uniqueSessions = new Set(pageViews.map((v) => v.session_id).filter(Boolean)).size;

    // Device breakdown
    const devices = { desktop: 0, mobile: 0, tablet: 0 };
    pageViews.forEach((v) => {
      const dt = v.device_type as keyof typeof devices;
      if (dt in devices) devices[dt]++;
    });
    const totalDevices = Math.max(devices.desktop + devices.mobile + devices.tablet, 1);
    const deviceData = [
      { name: "Desktop", value: Math.round((devices.desktop / totalDevices) * 100), icon: Monitor },
      { name: "Mobile", value: Math.round((devices.mobile / totalDevices) * 100), icon: Smartphone },
      { name: "Tablet", value: Math.round((devices.tablet / totalDevices) * 100), icon: Tablet },
    ];

    // Country breakdown
    const countryCounts: Record<string, number> = {};
    pageViews.forEach((v) => {
      if (v.country) countryCounts[v.country] = (countryCounts[v.country] || 0) + 1;
    });
    const countryData = Object.entries(countryCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([land, bezoekers]) => ({
        land,
        bezoekers,
        vlag: COUNTRY_FLAGS[land] || "🌍",
        pct: Math.round((bezoekers / Math.max(totalPageviews, 1)) * 100),
      }));

    // Region breakdown
    const regionCounts: Record<string, number> = {};
    pageViews.forEach((v) => {
      if (v.region) regionCounts[v.region] = (regionCounts[v.region] || 0) + 1;
    });
    const regionData = Object.entries(regionCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([regio, bezoekers]) => ({
        regio,
        bezoekers,
        pct: Math.round((bezoekers / Math.max(totalPageviews, 1)) * 100),
      }));
    // Top pages
    const pageCounts: Record<string, number> = {};
    pageViews.forEach((v) => {
      pageCounts[v.path] = (pageCounts[v.path] || 0) + 1;
    });
    const pageNames: Record<string, string> = {
      "/": "Homepage", "/terms": "Voorwaarden", "/privacy": "Privacybeleid",
      "/privacy-disclaimer": "Privacy Disclaimer", "/admin": "Admin Login",
    };
    const topPages = Object.entries(pageCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([page, views]) => ({
        page, naam: pageNames[page] || page, views,
        pct: Math.round((views / Math.max(totalPageviews, 1)) * 100),
      }));

    // Visitor chart data (by day)
    const dayMap: Record<string, { bezoekers: Set<string>; pageviews: number }> = {};
    pageViews.forEach((v) => {
      const d = new Date(v.created_at);
      const key = d.toISOString().slice(0, 10); // YYYY-MM-DD in UTC
      if (!dayMap[key]) dayMap[key] = { bezoekers: new Set(), pageviews: 0 };
      dayMap[key].pageviews++;
      dayMap[key].bezoekers.add(v.ip_hash || v.session_id || v.id);
    });
    const visitorChartData = Object.entries(dayMap)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([date, d]) => ({
        dag: `${date.slice(8, 10)}/${date.slice(5, 7)}`, // DD/MM format
        bezoekers: d.bezoekers.size,
        pageviews: d.pageviews,
      }));

    // Hourly data (UTC)
    const hourCounts = new Array(24).fill(0);
    pageViews.forEach((v) => {
      const h = new Date(v.created_at).getUTCHours();
      hourCounts[h]++;
    });
    const hourlyData = hourCounts.map((count, i) => ({
      uur: `${i.toString().padStart(2, "0")}:00`,
      bezoekers: count,
    }));

    return {
      totalPageviews, uniqueVisitors, uniqueSessions,
      deviceData, countryData, topPages, visitorChartData, hourlyData,
    };
  }, [pageViews]);

  const statCards = [
    { title: "Unieke Bezoekers", value: analytics.uniqueVisitors.toLocaleString(), icon: Users },
    { title: "Pageviews", value: analytics.totalPageviews.toLocaleString(), icon: Eye },
    { title: "Sessies", value: analytics.uniqueSessions.toLocaleString(), icon: Activity },
    { title: "Pagina's/Sessie", value: analytics.uniqueSessions > 0 ? (analytics.totalPageviews / analytics.uniqueSessions).toFixed(1) : "0", icon: Clock },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1440px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Website Analytics</h1>
          <p className="text-sm text-muted-foreground mt-0.5 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-primary" />
            Live verkeer en bezoekersgedrag — belgomed.be
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
              {periodLabels[p]}
            </button>
          ))}
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s) => (
          <StatCard key={s.title} {...s} loading={analyticsLoading} />
        ))}
      </div>

      {/* Main chart + devices */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="glass-card border-border/20 lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Bezoekerstrend
            </CardTitle>
          </CardHeader>
          <CardContent>
            {analyticsLoading ? (
              <div className="flex items-center justify-center h-[300px]">
                <Loader2 className="w-6 h-6 text-primary animate-spin" />
              </div>
            ) : analytics.visitorChartData.length === 0 ? (
              <div className="flex items-center justify-center h-[300px] text-muted-foreground text-sm">
                Nog geen data beschikbaar
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={analytics.visitorChartData} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
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
            )}
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
            {analyticsLoading ? (
              <div className="flex items-center justify-center h-[180px]">
                <Loader2 className="w-5 h-5 text-primary animate-spin" />
              </div>
            ) : (
              <>
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie data={analytics.deviceData} cx="50%" cy="50%" innerRadius={52} outerRadius={78} paddingAngle={3} dataKey="value" strokeWidth={0}>
                      {analytics.deviceData.map((_, i) => (
                        <Cell key={i} fill={DEVICE_COLORS[i]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-col gap-2.5 w-full mt-3">
                  {analytics.deviceData.map((d, i) => {
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
              </>
            )}
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
            {analyticsLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-5 h-5 text-primary animate-spin" />
              </div>
            ) : analytics.topPages.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">Nog geen data</p>
            ) : (
              analytics.topPages.map((p, i) => (
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
              ))
            )}
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
            {analyticsLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-5 h-5 text-primary animate-spin" />
              </div>
            ) : analytics.countryData.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">Nog geen data</p>
            ) : (
              analytics.countryData.map((c) => (
                <div key={c.land} className="flex items-center gap-3">
                  <span className="text-xl leading-none">{c.vlag}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-foreground font-medium">{c.land}</span>
                      <span className="text-xs font-semibold text-muted-foreground tabular-nums">{c.bezoekers.toLocaleString()}</span>
                    </div>
                    <div className="h-1 rounded-full bg-secondary/30 overflow-hidden">
                      <div className="h-full rounded-full bg-primary/60 transition-all duration-500" style={{ width: `${c.pct}%` }} />
                    </div>
                  </div>
                </div>
              ))
            )}
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
            {analyticsLoading ? (
              <div className="flex items-center justify-center h-[230px]">
                <Loader2 className="w-5 h-5 text-primary animate-spin" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={230}>
                <BarChart data={analytics.hourlyData} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.3} />
                  <XAxis dataKey="uur" stroke="hsl(var(--muted-foreground))" fontSize={10} interval={3} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="bezoekers" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Bezoekers" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

    </div>
  );
};

export default Dashboard;
