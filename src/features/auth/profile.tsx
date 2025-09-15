"use client";
import React from "react";
import { useAuth } from "@/src/contextts/context-auth";

const Profile = () => {
  const { userSignin } = useAuth();
  return (
    <div className="flex items-center gap-3">
      <h1>{userSignin.full_name}</h1>
      {userSignin.avatar_url && (
        <img
          src={userSignin.avatar_url}
          alt={userSignin.full_name}
          className="w-[35px] h-[35px] rounded-full"
          referrerPolicy="no-referrer"
        />
      )}
    </div>
  );
};

export default Profile;
