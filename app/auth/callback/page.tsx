"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/contextts/context-auth";
import authAPI from "@/src/services/auth";
import userAPI from "@/src/services/user";

export default function AuthCallbackPage() {
  const { setLoading, setUserSignin } = useAuth();
  const router = useRouter();
  const handleAuth = async () => {
    setLoading(true);
    try {
      const user = await authAPI.getAuthentication();
      if (user) {
        await userAPI.createUser({
          name: user.full_name,
          email: user.email || "",
        });
        setUserSignin(user);
        router.push("/product");
      } else {
        router.push("/");
      }
    } catch (err) {
      console.error("Auth error:", err);
      router.push("/auth/auth-code-error");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleAuth();
  }, []);
  return (
    <div className="flex justify-center items-center h-screen">Loading...</div>
  );
}
