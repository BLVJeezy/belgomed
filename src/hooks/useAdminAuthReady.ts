import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { getAdminClient, getAdminBackendStatus, AdminBackendStatus } from "@/lib/adminBackend";

type AuthState = {
  isReady: boolean;
  user: User | null;
  isAdmin: boolean;
  backendStatus: AdminBackendStatus;
};

export function useAdminAuthReady(): AuthState {
  const [state, setState] = useState<AuthState>({
    isReady: false,
    user: null,
    isAdmin: false,
    backendStatus: "not_initialized",
  });

  useEffect(() => {
    const status = getAdminBackendStatus();
    if (status === "missing_config") {
      setState({ isReady: true, user: null, isAdmin: false, backendStatus: "missing_config" });
      return;
    }

    const client = getAdminClient();
    if (!client) {
      setState({ isReady: true, user: null, isAdmin: false, backendStatus: "missing_config" });
      return;
    }

    let cancelled = false;

    const bootstrap = async () => {
      // Wait for session restoration
      const { data: { session } } = await client.auth.getSession();
      if (cancelled) return;

      if (!session) {
        setState({ isReady: true, user: null, isAdmin: false, backendStatus: "ready" });
        return;
      }

      // Check admin role
      const { data: roleData } = await client
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (cancelled) return;
      setState({
        isReady: true,
        user: session.user,
        isAdmin: !!roleData,
        backendStatus: "ready",
      });
    };

    bootstrap();

    // Listen for auth changes (sign in / sign out)
    const { data: { subscription } } = client.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setState({ isReady: true, user: null, isAdmin: false, backendStatus: "ready" });
        return;
      }
      // Re-check admin on sign-in
      client
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .maybeSingle()
        .then(({ data: roleData }) => {
          if (!cancelled) {
            setState({
              isReady: true,
              user: session.user,
              isAdmin: !!roleData,
              backendStatus: "ready",
            });
          }
        });
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  return state;
}
