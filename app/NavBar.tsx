"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import { classNames } from "./utils/misc";

const NavBar = () => {
  const pathName = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="flex space-x-6 border-b-2 mb-5 px-5 h-14 items-center">
      <Link href="/">
        <AiFillBug />
      </Link>

      <ul className="flex space-x-6 ">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className={classNames(
                `${link.href === pathName ? "text-zinc-900" : "text-zinc-400"}`,
                "transition-colors hover:text-blue-700"
              )}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
