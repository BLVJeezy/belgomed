import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Loader2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const teamInfo: Record<string, { name: string; role: string; avatar: string }> = {
  dirk: { name: "Dirk V.", role: "Sales Manager", avatar: "DV" },
  sarah: { name: "Sarah M.", role: "Account Executive", avatar: "SM" },
  jason: { name: "Jason B.", role: "Super-Admin", avatar: "JB" },
};

const stageLabels: Record<string, string> = {
  nieuw: "Nieuw",
  in_behandeling: "In Behandeling",
  wacht_op_vergunning: "Wacht op Vergunning",
  offerte_gestuurd: "Offerte Gestuurd",
  afgehandeld: "Afgehandeld",
};

type MemberStats = {
  key: string;
  name: string;
  role: string;
  avatar: string;
  total: number;
  active: number;
  completed: number;
  stages: Record<string, number>;
  currentStage: string;
};

const Leaderboard = () => {
  const [teamStats, setTeamStats] = useState<MemberStats[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const { data: leads } = await supabase.from("leads").select("assignee, stage");
      if (leads) {
        const stats = Object.entries(teamInfo).map(([key, info]) => {
          const memberLeads = leads.filter((l) => l.assignee === key);
          const stages: Record<string, number> = {};
          memberLeads.forEach((l) => {
            stages[l.stage] = (stages[l.stage] || 0) + 1;
          });
          const active = memberLeads.filter((l) => l.stage !== "afgehandeld").length;
          const completed = memberLeads.filter((l) => l.stage === "afgehandeld").length;
          const activeLead = memberLeads.find((l) => l.stage !== "afgehandeld");
          return {
            key,
            ...info,
            total: memberLeads.length,
            active,
            completed,
            stages,
            currentStage: activeLead ? stageLabels[activeLead.stage] ?? activeLead.stage : "Geen actieve leads",
          };
        });
        stats.sort((a, b) => b.total - a.total);
        setTeamStats(stats);
      }
      setLoading(false);
    };
    fetch();
  }, []);

  const medals = ["🥇", "🥈", "🥉"];
  const maxTotal = Math.max(...teamStats.map((m) => m.total), 1);

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1400px]">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Trophy className="w-6 h-6 text-primary" /> Sales Overzicht
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">Team prestaties en pipeline status</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-6 h-6 text-primary animate-spin" />
        </div>
      ) : (
        <>
          {/* Podium cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {teamStats.map((member, i) => (
              <Card
                key={member.key}
                className={`glass-card border-border/30 cursor-pointer hover:border-primary/30 transition-colors ${i === 0 ? "sm:order-2 ring-1 ring-primary/20" : i === 1 ? "sm:order-1" : "sm:order-3"}`}
                onClick={() => navigate(`/admin/leads?assignee=${member.key}`)}
              >
                <CardContent className="p-6 text-center">
                  <span className="text-3xl">{medals[i] ?? `#${i + 1}`}</span>
                  <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-lg font-bold text-primary mx-auto mt-3">
                    {member.avatar}
                  </div>
                  <p className="text-lg font-bold text-foreground mt-3">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                  <div className="flex justify-center gap-6 mt-4">
                    <div>
                      <p className="text-2xl font-bold text-foreground">{member.total}</p>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Totaal</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">{member.active}</p>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Actief</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-400">{member.completed}</p>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Klaar</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detailed breakdown */}
          <div className="space-y-4">
            {teamStats.map((member, i) => (
              <Card key={member.key} className="glass-card border-border/30">
                <CardContent className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* Identity */}
                    <div className="flex items-center gap-3 min-w-[200px]">
                      <span className="text-lg w-7 text-center">{medals[i] ?? `#${i + 1}`}</span>
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                        {member.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{member.name}</p>
                        <p className="text-[11px] text-muted-foreground">{member.role}</p>
                      </div>
                    </div>

                    {/* Stage breakdown */}
                    <div className="flex-1 flex flex-wrap gap-2">
                      {Object.entries(stageLabels).map(([key, label]) => {
                        const count = member.stages[key] ?? 0;
                        return (
                          <span
                            key={key}
                            className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${
                              count > 0 ? "bg-primary/15 text-primary" : "bg-secondary/30 text-muted-foreground"
                            }`}
                          >
                            {label}: {count}
                          </span>
                        );
                      })}
                    </div>

                    {/* Progress + link */}
                    <div className="flex items-center gap-4 min-w-[220px]">
                      <div className="flex-1">
                        <div className="h-2 rounded-full bg-secondary/50 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                            style={{ width: `${(member.total / maxTotal) * 100}%` }}
                          />
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-1">
                          Bezig met: <span className="text-foreground">{member.currentStage}</span>
                        </p>
                      </div>
                      <button
                        onClick={() => navigate(`/admin/leads?assignee=${member.key}`)}
                        className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                        title="Bekijk leads"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Leaderboard;
