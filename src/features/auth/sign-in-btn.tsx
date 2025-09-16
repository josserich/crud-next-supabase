"use client";
import { useAuth } from "@/src/contextts/context-auth";
import authAPI from "@/src/services/auth";
import React from "react";
import { FcGoogle } from "react-icons/fc";

const SignInBtn = () => {
  const { loading, setLoading } = useAuth();
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
