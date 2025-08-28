import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { useApolloClient } from "@apollo/client";

type User = { id: string; firstName: string; lastName: string; phone: string };

type AuthCtx = {
  token: string | null;
  user: User | null;
  loading: boolean;
  saveAuth: (token: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
};
const AuthContext = createContext<AuthCtx>({
  token: null,
  user: null,
  loading: true,
  saveAuth: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const apollo = useApolloClient();

  useEffect(() => {
    (async () => {
      const t = await SecureStore.getItemAsync("token");
      const u = await SecureStore.getItemAsync("user");
      setToken(t);
      setUser(u ? JSON.parse(u) : null);
      setLoading(false);
    })();
  }, []);

  const saveAuth = async (token: string, user: User) => {
    setToken(token);
    setUser(user);
    await SecureStore.setItemAsync("token", token);
    await SecureStore.setItemAsync("user", JSON.stringify(user));
    await apollo.resetStore();
  };

  const logout = async () => {
    try {
      setToken(null);
      setUser(null);
      await SecureStore.deleteItemAsync("token");
      await SecureStore.deleteItemAsync("user");
      await apollo.clearStore();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ token, user, loading, saveAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
