import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Mail, Shield } from "lucide-react";
import logoBelgomed from "@/assets/logo-belgomed.png";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password
      });

      if (authError) {
        setError("Ongeldige inloggegevens. Probeer het opnieuw.");
        setLoading(false);
        return;
      }

      // Check admin role
      const { data: roleData, error: roleError } = await supabase.
      from("user_roles").
      select("role").
      eq("user_id", data.user.id).
      eq("role", "admin").
      maybeSingle();

      if (roleError || !roleData) {
        await supabase.auth.signOut();
        setError("Geen admin-toegang. Alleen geautoriseerd personeel.");
        setLoading(false);
        return;
      }

      navigate("/admin/dashboard");
    } catch {
      setError("Er is een fout opgetreden.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <img alt="Belgomed" className="h-14 w-auto dark:invert dark:hue-rotate-180" src="/lovable-uploads/0133504b-f9ba-47e9-a052-2847415e760d.png" />
          </div>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm uppercase tracking-widest">Client Login</span>
          </div>
        </div>

        {/* Login card */}
        <div className="glass-card p-8">
          <h1 className="text-xl font-semibold text-foreground mb-1">Toegang Dashboard</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Alleen voor geautoriseerd personeel
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-muted-foreground">E-mailadres</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@belgomed.be"
                  className="pl-10 bg-secondary/50 border-border/50 focus:border-primary"
                  required />

              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-muted-foreground">Wachtwoord</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 bg-secondary/50 border-border/50 focus:border-primary"
                  required />

              </div>
            </div>

            {error &&
            <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">
                {error}
              </p>
            }

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? "Verifiëren..." : "Dashboard Ontgrendelen"}
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          © {new Date().getFullYear()} Belgomed — Beveiligde toegang
        </p>
      </div>
    </div>);

};

export default AdminLogin;