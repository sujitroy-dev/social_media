"use client";
import React from "react";
import UserActionsPanel from "@/components/layout/UserActionsPanel";
import AdditionalContentPanel from "@/components/layout/AdditionalContentPanel";
import HeaderFeed from "@/components/Feed/Header";

export default function MainLayout({ children }) {
  return (
    <div className="h-screen container m-auto flex overflow-hidden">
      <UserActionsPanel />
      <div className=" flex-1 flex flex-col overflow-y-auto no-scrollbar">
        <HeaderFeed />
        <main className="flex-1 px-10 py-4">{children}</main>
      </div>
      <AdditionalContentPanel />
    </div>
  );
}
