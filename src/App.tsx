import { Routes, Route, Navigate } from "react-router";
import { useEffect, useState } from "react";
import AuthPage from "./pages/AuthPage";
import PostPage from "./pages/PostPage";

import { supabase } from "./api/supabase-client";
function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return <p className="p-4">Cargando…</p>;

  return (
    <Routes>
      <Route
        path="/auth"
        element={!session ? <AuthPage /> : <Navigate to="/posts" replace />}
      />
      <Route
        path="/posts"
        element={session ? <PostPage /> : <Navigate to="/auth" replace />}
      />
      <Route
        path="*"
        element={<Navigate to={session ? "/posts" : "/auth"} replace />}
      />
    </Routes>
  );
}

export default App;
