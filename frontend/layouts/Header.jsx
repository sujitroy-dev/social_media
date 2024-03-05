import Link from "next/link";
import { Navbar as MTNavbar, Typography } from "@material-tailwind/react";

export default function HeaderFeed() {
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
