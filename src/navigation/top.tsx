import React from "react";
import Profile from "@/src/features/auth/profile";
import SignOutBtn from "@/src/features/auth/sign-out-btn";

const Top = () => {
  return (
    <div className="flex justify-between">
      <Profile />
      <SignOutBtn />
    </div>
  );
};

export default Top;
