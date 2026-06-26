"use client";

import Link from "next/link";

export default function Navbar() {
  const navItems = [
    { name: "Resume", href: "/resume" },
    { name: "Interview", href: "/interview" },
    { name: "ATS", href: "/ats" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  return (
    <header className="sticky top-6 z-50 px-6">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-[22px] border border-white/5 bg-[#111113]/90 px-8 py-5 backdrop-blur-2xl">

        {/* Logo */}

        <Link href="/" className="flex items-center gap-3">

          <div className="h-3 w-3 rounded-full bg-cyan-400" />

          <h1 className="text-3xl font-bold tracking-tight text-white">
            PlacementCoach
          </h1>

        </Link>

        {/* Navigation */}

        <div className="hidden items-center gap-10 md:flex">

          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-base font-medium text-zinc-400 transition-all duration-300 hover:text-white"
            >
              {item.name}
            </Link>
          ))}

        </div>

        {/* Button */}

        <Link
          href="/resume"
          className="rounded-2xl border border-white/10 bg-[#18181B] px-7 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-[#1E1E22]"
        >
          Get Started
        </Link>

      </nav>
    </header>
  );
}