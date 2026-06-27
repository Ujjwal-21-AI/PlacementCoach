"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Resume", href: "/resume" },
    { name: "Interview", href: "/interview" },
    { name: "ATS", href: "/ats" },
    { name: "Dashboard", href: "/dashboard" }, // Change to "/Dashboard" if your folder name is Dashboard
  ];

  return (
    <header className="sticky top-6 z-50 px-6">
      <nav className="mx-auto flex max-w-7xl items-center rounded-[22px] border border-white/5 bg-[#111113]/90 px-8 py-5 backdrop-blur-xl shadow-[0_0_30px_rgba(0,255,255,0.05)]">

        {/* Logo */}

        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <div className="h-3 w-3 rounded-full bg-cyan-400" />

          <h1 className="whitespace-nowrap text-2xl font-bold tracking-tight text-white">
            PlacementCoach
          </h1>
        </Link>

        {/* Navigation */}

        <div className="hidden flex-1 items-center justify-center gap-10 lg:flex">

          {navItems.map((item) => {

            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative text-base font-medium transition-all duration-300 ${
                  isActive
                    ? "text-cyan-400"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {item.name}

                {isActive && (
                  <span className="absolute -bottom-2 left-0 h-[2px] w-full rounded-full bg-cyan-400" />
                )}
              </Link>
            );
          })}

        </div>

        {/* Right Side */}

        <div className="hidden items-center gap-3 lg:flex">

          <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-400" />

          <span className="text-sm font-medium text-zinc-400">
            AI Online
          </span>

        </div>

      </nav>
    </header>
  );
}