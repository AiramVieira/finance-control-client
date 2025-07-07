import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Finance } from "../@types/finances";

interface AuthContextType {
  secretKey: string;
  entries: Finance[];
  isAuthenticated: boolean;
  setAuthData: (secretKey: string, entries: Finance[]) => void;
  clearAuthData: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [secretKey, setSecretKey] = useState<string>("");
  const [entries, setEntries] = useState<Finance[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const setAuthData = (newSecretKey: string, newEntries: Finance[]) => {
    setSecretKey(newSecretKey);
    setEntries(newEntries);
    setIsAuthenticated(true);
  };

  const clearAuthData = () => {
    setSecretKey("");
    setEntries([]);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        secretKey,
        entries,
        isAuthenticated,
        setAuthData,
        clearAuthData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}; 