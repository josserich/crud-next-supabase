"use client";
import { useAuth } from "@/src/contextts/context-auth";
import SignInBtn from "@/src/features/auth/sign-in-btn";

export default function Home() {
  const { loading } = useAuth();
  return (
    <div className="bg-slate-200 flex min-h-screen">
      <div className="w-2xl border-slate-200 m-auto p-5 bg-slate-100 rounded shadow">
        {!loading && <h1 className="text-2xl text-center mb-3">Welcome</h1>}
        <SignInBtn />
      </div>
    </div>
  );
}
