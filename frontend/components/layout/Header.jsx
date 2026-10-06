"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, User, Menu, Puzzle, ChevronDown, Download, FileText } from "lucide-react";
import { useSidebar } from "./SidebarContext";

export default function Header({ isTransparent = false, showExtensionButton }) {
  const pathname = usePathname();
  const { toggleMobileOpen } = useSidebar();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isExplore =
    showExtensionButton !== undefined
      ? showExtensionButton
      : !pathname || pathname === "/" || pathname.startsWith("/search");

  const navLinks = [
    { href: "/", label: "Explore" },
    { href: "/about", label: "About" },
    { href: "/sources", label: "Resources" },
  ];

  const headerBg = isTransparent
    ? "bg-black/50 backdrop-blur-md border-b border-white/5"
    : "bg-black/95 backdrop-blur-md border-b border-white/5 shadow-lg";

  return (
    <header className={`w-full fixed top-0 left-0 right-0 h-16 z-50 transition-colors ${headerBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Left: Mobile Menu Trigger & Official SOL AI Logo */}
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleMobileOpen}
              className="md:hidden p-2 rounded-lg text-slate-300 hover:text-[#E5C158] hover:bg-white/10 transition cursor-pointer"
              aria-label="Toggle Mobile Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Official SOL AI Logo -> Clicking navigates to Home / */}
            <Link href="/" className="flex items-center space-x-2 group">
              <img
                src="/navbar_logo.png"
                alt="சொல் AI"
                className="h-10 sm:h-12 w-auto object-contain rounded group-hover:scale-105 transition-transform"
              />
            </Link>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 font-serif-tamil text-sm">
            {navLinks.map((link) => {
              const isActive =
                (link.label === "Explore" && (pathname === "/" || pathname.startsWith("/search"))) ||
                (link.label === "About" && pathname === "/about") ||
                (link.label === "Resources" && pathname === "/sources");

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-1 transition-colors ${
                    isActive
                      ? "text-[#E5C158] font-semibold border-b-2 border-[#C9A227]"
                      : "text-slate-300 hover:text-[#E5C158]"
                  }`}
                >
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right: Explore page top-right Download சொல் AI Extension button UI */}
          {isExplore ? (
            <div className="relative shrink-0" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 rounded-full bg-black/70 hover:bg-black/85 backdrop-blur-md border border-[#C9A227]/60 hover:border-[#E5C158] shadow-[0_0_12px_rgba(201,162,39,0.2)] hover:shadow-[0_0_18px_rgba(201,162,39,0.35)] transition-all duration-200 cursor-pointer select-none group active:scale-[0.98]"
                title="Download சொல் AI Extension & Resources"
                aria-label="Download சொல் AI Extension & Resources"
                aria-expanded={isDropdownOpen}
              >
                {/* Gold SOL AI logo/icon on the LEFT */}
                <img
                  src="/sol_emblem.png"
                  alt=""
                  className="w-4.5 h-4.5 sm:w-5 sm:h-5 object-contain shrink-0 group-hover:scale-105 transition-transform"
                />

                {/* Text */}
                <span className="text-xs sm:text-[13px] font-medium text-[#E5C158] font-sans-tamil tracking-wide whitespace-nowrap leading-none flex items-center">
                  Download சொல் AI Extension
                </span>

                {/* Gold puzzle-piece icon */}
                <Puzzle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E5C158] fill-[#E5C158] shrink-0 group-hover:scale-110 transition-transform" />

                {/* Rotating Chevron arrow */}
                <ChevronDown
                  className={`w-3.5 h-3.5 text-[#E5C158] transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Sleek Golden Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-xl bg-[#0B132B]/95 backdrop-blur-xl border border-[#C9A227]/50 shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_15px_rgba(201,162,39,0.25)] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3.5 py-2 border-b border-white/10 mb-1">
                    <p className="text-xs font-semibold text-[#E5C158] uppercase tracking-wider font-mono">
                      Browser Extension Package
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Install unpack bundle & review fair use guidelines
                    </p>
                  </div>

                  {/* Option 1: Extension ZIP */}
                  <a
                    href="/sol-ai-extension.zip"
                    download="sol-ai-extension.zip"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-start gap-3 px-3.5 py-2.5 hover:bg-white/10 transition-colors group cursor-pointer"
                  >
                    <div className="p-2 rounded-lg bg-[#C9A227]/15 border border-[#C9A227]/30 text-[#E5C158] group-hover:bg-[#C9A227]/25 transition-colors shrink-0 mt-0.5">
                      <Download className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs sm:text-[13px] font-semibold text-white group-hover:text-[#E5C158] transition-colors">
                          Download Extension (.ZIP)
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded font-mono">
                          v1.0
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                        Ready to load in Chrome, Edge, and Brave via Developer mode
                      </p>
                    </div>
                  </a>

                  {/* Option 2: PDF User Guide */}
                  <a
                    href="/SOL_AI_Extension_Guide.pdf"
                    download="SOL_AI_Extension_Guide.pdf"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-start gap-3 px-3.5 py-2.5 hover:bg-white/10 transition-colors group cursor-pointer"
                  >
                    <div className="p-2 rounded-lg bg-[#E5C158]/15 border border-[#E5C158]/30 text-[#E5C158] group-hover:bg-[#E5C158]/25 transition-colors shrink-0 mt-0.5">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs sm:text-[13px] font-semibold text-white group-hover:text-[#E5C158] transition-colors">
                          User Guide & Policy (.PDF)
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded font-mono">
                          20 req/day
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                        Setup manual, feature breakdown & 20 requests/day fair use policy
                      </p>
                    </div>
                  </a>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <button
                className="p-2 rounded-full text-slate-300 hover:text-[#E5C158] hover:bg-white/10 transition cursor-pointer"
                title="Toggle Theme"
              >
                <Sun className="w-4 h-4" />
              </button>
              <button
                className="p-2 rounded-full text-slate-300 hover:text-[#E5C158] hover:bg-white/10 transition cursor-pointer"
                title="User Profile"
              >
                <User className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
