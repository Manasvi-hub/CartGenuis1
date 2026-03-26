import { useState, useCallback, useEffect } from "react";

const AUTH_KEY = "cartgenius_user";

export interface User {
  email: string;
  name: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const raw = localStorage.getItem(AUTH_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    if (user) localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    else localStorage.removeItem(AUTH_KEY);
  }, [user]);

  const signIn = useCallback((email: string, _password: string) => {
    return new Promise<User>((resolve) => {
      setTimeout(() => {
        const u: User = { email, name: email.split("@")[0] };
        setUser(u);
        resolve(u);
      }, 1200);
    });
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
  }, []);

  return { user, showAuth, setShowAuth, signIn, signOut };
}
