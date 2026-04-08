import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { getAdminClient } from "@/lib/adminBackend";
import AdminSidebar from "./AdminSidebar";

type Status = "loading" | "ready" | "unauthorized" | "backend_unavailable";

const AdminLayout = () => {
  const [status, setStatus] = useState<Status>("loading");
  const navigate = useNavigate();

  useEffect(() => {
    const client = getAdminClient();
    if (!client) {
      setStatus("backend_unavailable");
      return;
    }

    const checkAuth = async () => {
      const { data: { session } } = await client.auth.getSession();
      if (!session) {
        navigate("/admin");
        return;
      }

      const { data: roleData } = await client
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (!roleData) {
        await client.auth.signOut();
        navigate("/admin");
        return;
      }

      setStatus("ready");
    };

    checkAuth();

    const { data: { subscription } } = client.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        navigate("/admin");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (status === "backend_unavailable") {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <h1 className="text-xl font-semibold text-foreground">Backend niet beschikbaar</h1>
          <p className="text-sm text-muted-foreground">De configuratie kon niet geladen worden.</p>
          <button onClick={() => window.location.reload()} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm">
            Opnieuw proberen
          </button>
        </div>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center">
        <div className="text-primary animate-pulse text-lg">Laden...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar />
      <main className="flex-1 overflow-auto pt-14 lg:pt-0">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
