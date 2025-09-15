"use client";
import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  useContext,
} from "react";
import { usePathname, useRouter } from "next/navigation";

interface AuthContextType {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  userSignin: UserSignin;
  setUserSignin: Dispatch<SetStateAction<UserSignin>>;
  authorizeErr: string;
  setAuthorizeErr: Dispatch<SetStateAction<string>>;
}
interface AuthProviderProps {
  children: ReactNode;
}
interface UserSignin {
  full_name: string;
  avatar_url: string;
}
const AuthContext = createContext<AuthContextType | null>(null);
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [userSignin, setUserSignin] = useState<UserSignin>({
    full_name: "",
    avatar_url: "",
  });
  const [authorizeErr, setAuthorizeErr] = useState<string>("");
  const protectedRoutes = () => {
    const lsProtectedRoutes = ["/product"];
    const isNotLogin = !userSignin.full_name && !userSignin.avatar_url;
    if (lsProtectedRoutes.includes(pathname) && isNotLogin) {
      router.push("/");
    }
  };
  useEffect(() => {
    protectedRoutes();
  }, [pathname]);
  const value = {
    loading,
    setLoading,
    userSignin,
    setUserSignin,
    authorizeErr,
    setAuthorizeErr,
  };
  return <AuthContext value={value}>{children}</AuthContext>;
};

export default AuthContext;
// context-auth.tsx
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
