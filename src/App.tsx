import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import Zoekwoorden from "./pages/Zoekwoorden";
import RxMedicijnen from "./pages/diensten/RxMedicijnen";
import OtcProducten from "./pages/diensten/OtcProducten";
import MedischeHulpmiddelen from "./pages/diensten/MedischeHulpmiddelen";
import Vlaanderen from "./pages/regio/Vlaanderen";
import Wallonie from "./pages/regio/Wallonie";
import Brussel from "./pages/regio/Brussel";

const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminLayout = lazy(() => import("./components/admin/AdminLayout"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const Leads = lazy(() => import("./pages/admin/Leads"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));

const queryClient = new QueryClient();

const AdminFallback = () => (
  <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
    Laden...
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/zoekwoorden" element={<Zoekwoorden />} />
          <Route path="/diensten/rx-medicijnen" element={<RxMedicijnen />} />
          <Route path="/diensten/otc-producten" element={<OtcProducten />} />
          <Route path="/diensten/medische-hulpmiddelen" element={<MedischeHulpmiddelen />} />
          <Route path="/regio/vlaanderen" element={<Vlaanderen />} />
          <Route path="/regio/wallonie" element={<Wallonie />} />
          <Route path="/regio/brussel" element={<Brussel />} />
          <Route path="/admin" element={<Suspense fallback={<AdminFallback />}><AdminLogin /></Suspense>} />
          <Route element={<Suspense fallback={<AdminFallback />}><AdminLayout /></Suspense>}>
            <Route path="/admin/dashboard" element={<Suspense fallback={<AdminFallback />}><Dashboard /></Suspense>} />
            <Route path="/admin/leads" element={<Suspense fallback={<AdminFallback />}><Leads /></Suspense>} />
            <Route path="/admin/settings" element={<Suspense fallback={<AdminFallback />}><AdminSettings /></Suspense>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
