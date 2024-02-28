import React from "react";
import { Navbar as MTNavbar, Typography } from "@material-tailwind/react";
import UserActionsPanel from "@/components/layout/UserActionsPanel";
import AdditionalContentPanel from "@/components/layout/AdditionalContentPanel";
import Link from "next/link";

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

function HeaderFeed() {
  const navLinks = [
    {
      label: "Recents",
      path: "/feed",
    },
    {
      label: "Friends",
      path: "/feed",
    },
    {
      label: "Popular",
      path: "/feed",
    },
  ];
  return (
    <MTNavbar
      className="sticky top-0 z-10 h-22 pt-8 w-full shadow-sm rounded-none text-black flex justify-between items-center"
      color="white"
    >
      <Typography variant="h5">Feeds</Typography>
      <ul className="flex justify-between gap-3">
        {navLinks.map((link) => (
          <li className="text-sm" key={link.label + link.path}>
            <Link href={link.path}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </MTNavbar>
  );
}
