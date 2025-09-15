"use client";
import { useAuth } from "@/src/contextts/context-auth";
import authAPI from "@/src/services/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignOutBtn = () => {
  const { setUserSignin } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    try {
      await authAPI.signOut();
      setUserSignin({ full_name: "", avatar_url: "" });
      router.push("/");
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return (
    <button
      className="btn bg-red-500 text-white"
      onClick={handleLogout}
      disabled={loading}
    >
      Sign out
    </button>
  );
};

export default SignOutBtn;
