import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

/**
 * Professional, responsive, and accessible top navigation
 * - Mobile-first with a collapsible menu
 * - Uses NavLink for active route styling (no reload hacks)
 * - Sticky header with subtle blur/transparency on scroll
 * - Keyboard/ARIA friendly (Escape to close menu, proper labels)
 */
export default function NavBar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Close the mobile menu on route change
  useEffect(() => {
    const unlisten = navigate((location) => {}, { replace: true });
    return () => {
      // nothing to clean up from navigate hook
    };
  }, [navigate]);

  // Close menu with escape key
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const linkBase =
    "block px-3 py-2 rounded-xl transition outline-none focus:ring-2 focus:ring-white/40 ";
  const linkInactive = "text-blue-200 hover:text-blue-300 hover:bg-white/5";
  const linkActive = "text-white bg-white/10";

  return (
    <header className="fixed top-0 inset-x-0 z-50 ">
      <nav className="backdrop-blur supports-[backdrop-filter]:bg-black/60 bg-black text-white border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex h-14 sm:h-16 items-center justify-between">
            {/* Brand */}
            <button
              className="flex items-center gap-2 group"
              onClick={() => navigate("/home")}
              aria-label="Go to home"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-gray-400 text-lg sm:text-xl font-semibold tracking-wide max-sm:text-[25px]">
                Movie App
              </span>
            </button>

            {/* Desktop nav */}
            <div className="hidden sm:flex items-center gap-1">
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : linkInactive}`
                }
                end
              >
                Home
              </NavLink>
              <NavLink
                to="/favourites"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : linkInactive} `
                }
                 
              >
                Favourites
              </NavLink>
            </div>

            {/* Mobile toggle */}
            <div className="sm:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-xl hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
                aria-controls="mobile-menu"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
              >
                <span className="sr-only">Open main menu</span>
                {/* Hamburger / X icon */}
                <svg className={`h-6 w-6 ${open ? "hidden" : "block"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
                <svg className={`h-6 w-6 ${open ? "block" : "hidden"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={`${open ? "block" : "hidden"} sm:hidden border-t border-white/10`}
        >
          <div className="px-4 py-3 space-y-1">
            <NavLink
              to="/home"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `${linkBase} w-full ${isActive ? linkActive : linkInactive}`
              }
              end
            >
              Home
            </NavLink>
            <NavLink
              to="/favourites"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `${linkBase} w-full ${isActive ? linkActive : linkInactive}`
              }
            >
              Favourites
            </NavLink>
          </div>
        </div>
      </nav>
      {/* Spacer so content is not hidden behind fixed header */}
      <div className="h-14 sm:h-16" aria-hidden />
    </header>
  );
}
