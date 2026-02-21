import { useState } from "react";
import { LayoutDashboard, Users, Settings, LogOut, Menu, X, Trophy } from "lucide-react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import logoB from "@/assets/logo-b.png";

const navItems = [
  { label: "Overview", to: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Leads", to: "/admin/leads", icon: Users },
  { label: "Leaderboard", to: "/admin/leaderboard", icon: Trophy },
  { label: "Settings", to: "/admin/settings", icon: Settings },
];

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  const sidebarContent = (
    <>
      {/* Brand */}
      <div className="p-5 lg:p-6 border-b border-border/30 flex items-center justify-between">
        <div>
          <a href="/" className="flex items-center gap-2">
            <img src={logoB} alt="Belgomed" className="h-8 w-auto" />
            <span className="text-lg font-bold tracking-wider text-foreground">BELGOMED</span>
          </a>
          <p className="text-[10px] uppercase tracking-widest text-primary mt-1">Admin Dashboard</p>
        </div>
        <button
          onClick={() => setMobileOpen(false)}
          className="lg:hidden p-1 text-muted-foreground hover:text-foreground"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 lg:p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`
            }
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-3 lg:p-4 border-t border-border/30">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors w-full"
        >
          <LogOut className="w-4 h-4" />
          Uitloggen
        </button>
      </div>
    </>
  );

  const currentPage = navItems.find((i) => i.to === location.pathname)?.label ?? "Admin";

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/30 flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <img src={logoB} alt="Belgomed" className="h-7 w-auto" />
          <span className="text-sm font-bold tracking-wider text-foreground">{currentPage}</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`lg:hidden fixed top-0 left-0 bottom-0 z-50 w-72 bg-background border-r border-border/30 flex flex-col transform transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 min-h-screen border-r border-border/30 bg-background/80 backdrop-blur-xl flex-col">
        {sidebarContent}
      </aside>
    </>
  );
};

export default AdminSidebar;
