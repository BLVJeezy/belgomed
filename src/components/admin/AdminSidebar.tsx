import { LayoutDashboard, Users, Truck, Settings, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import logoB from "@/assets/logo-b.png";

const navItems = [
  { label: "Overview", to: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Leads", to: "/admin/leads", icon: Users },
  { label: "Logistics", to: "/admin/logistics", icon: Truck },
  { label: "Settings", to: "/admin/settings", icon: Settings },
];

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  return (
    <aside className="w-64 min-h-screen border-r border-border/30 bg-background/80 backdrop-blur-xl flex flex-col">
      {/* Brand */}
      <div className="p-6 border-b border-border/30">
        <a href="/" className="flex items-center gap-2">
          <img src={logoB} alt="Belgomed" className="h-8 w-auto" />
          <span className="text-lg font-bold tracking-wider text-foreground">BELGOMED</span>
        </a>
        <p className="text-[10px] uppercase tracking-widest text-primary mt-1">Admin Dashboard</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
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
      <div className="p-4 border-t border-border/30">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors w-full"
        >
          <LogOut className="w-4 h-4" />
          Uitloggen
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
