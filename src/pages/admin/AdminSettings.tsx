import { useEffect, useState } from "react";
import { getAdminClient } from "@/lib/adminBackend";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, User, Mail } from "lucide-react";

const AdminSettings = () => {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const client = getAdminClient();
      if (!client) return;
      const { data: { user } } = await client.auth.getUser();
      setEmail(user?.email ?? "");
    };
    getUser();
  }, []);

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Settings</h1>

      <Card className="glass-card border-border/30 max-w-lg">
        <CardHeader>
          <CardTitle className="text-lg text-foreground flex items-center gap-2">
            <User className="w-5 h-5 text-primary" /> Profiel
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-foreground">{email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Super-Admin</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;
