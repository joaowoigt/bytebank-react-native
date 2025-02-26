import { auth } from "@/firebase/config";
import { router } from "expo-router";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { createContext, ReactNode, useContext, useState } from "react";

interface IAuthContext {
  user: UserCredential | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserCredential | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential);
      setIsAuthenticated(true);
      console.log("AuthProvider :: login - Usuario logado com sucesso");
      return true;
    } catch (error) {
      console.log("AuthProvider :: login - Usuario nao encontrado");
      setIsAuthenticated(false);
      return false;
    }
  };

  const signup = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("AuthProvider :: sigup - Usuario cadastrado com sucesso");
        router.replace("/login");
      })
      .catch((error) => {
        console.log("AuthProvider :: sigup - Erro ao cadastrar usuario", error);
      });
  };

  const logout = () => {
    auth.signOut();
    setUser(null);
    setIsAuthenticated(false);
    console.log("AuthProvider :: logout - Usuario deslogado");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "Contexto não encontrado, useAuth deve estar dentro de AuthProvider"
    );
  }
  return context;
};
