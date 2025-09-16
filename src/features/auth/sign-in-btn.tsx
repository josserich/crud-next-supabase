"use client";
import { useAuth } from "@/src/contextts/context-auth";
import authAPI from "@/src/services/auth";
import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import userAPI from "@/src/services/user";

const SignInBtn = () => {
  const { loading, setLoading, setUserSignin } = useAuth();
  const router = useRouter();
  const handleSignIn = async () => {
    setLoading(true);
    try {
      await authAPI.signIn();
    } catch (error) {
      console.log("error", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const checkSession = async () => {
    setLoading(true);
    try {
      const authenticated = await authAPI.getAuthentication();
      if (authenticated) {
        await userAPI.createUser({
          name: authenticated.full_name,
          email: authenticated.email,
        });
        setUserSignin(authenticated);
        router.push("/product");
      }
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    checkSession();
  }, []);
  return (
    <div className="flex justify-center">
      {loading && <span className="loading loading-dots loading-xl"></span>}
      {!loading && (
        <button className="btn" onClick={handleSignIn} disabled={loading}>
          <FcGoogle className="text-3xl" /> Sign In With Google
        </button>
      )}
    </div>
  );
};

export default SignInBtn;
