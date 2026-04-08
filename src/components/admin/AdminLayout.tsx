import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAdminAuthReady } from "@/hooks/useAdminAuthReady";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  const navigate = useNavigate();
  const { isReady, user, isAdmin, backendStatus } = useAdminAuthReady();

  useEffect(() => {
    if (!isReady) return;
    if (backendStatus === "missing_config") return; // show fallback
    if (!user || !isAdmin) {
      navigate("/admin", { replace: true });
    }
  }, [isReady, user, isAdmin, backendStatus, navigate]);

  if (!isReady) {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center">
        <div className="text-primary animate-pulse text-lg">Laden...</div>
      </div>
    );
  }

  if (backendStatus === "missing_config") {
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

  if (!user || !isAdmin) {
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
