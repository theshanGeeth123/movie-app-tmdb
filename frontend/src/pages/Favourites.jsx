import React, { useEffect, useState, useCallback } from "react";
import { NavLink } from "react-router-dom";
import MovieCard from "../components/MovieCard";

/**
 * Favourites page
 * - Mobile-first layout that mirrors Home.jsx grid + spacing
 * - Uses only the NavBar spacer for top offset (no extra pt- classes)
 * - Robust localStorage parsing + live sync when favourites change in another tab
 */
export default function Favourites() {
  const [fMovies, setFMovies] = useState([]);

  const readFavs = useCallback(() => {
    try {
      const raw = localStorage.getItem("favs");
      const parsed = raw ? JSON.parse(raw) : [];
      if (Array.isArray(parsed)) {
        setFMovies(parsed);
      } else {
        setFMovies([]);
      }
    } catch {
      setFMovies([]);
    }
  }, []);

  useEffect(() => {
    readFavs();
  }, [readFavs]);

  // Keep in sync across tabs/windows
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "favs") readFavs();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [readFavs]);

  return (
    <div className="w-full bg-[#1b1b1c] min-h-screen pt-20">
      <main className="w-[92%] max-w-6xl mx-auto pt-4 sm:pt-6 pb-12">
        <header className="mb-10 sm:mb-6">
          <h1 className="text-white text-xl sm:text-2xl font-semibold text-center ">Your favourites ❤️</h1>
          
        </header>

        {fMovies.length === 0 ? (
          <section className="rounded-xl border border-white/10 bg-white/5 p-6 text-center text-white/80">
            <p className="mb-3">No favourites yet.</p>
            <NavLink
              to="/home"
              className="inline-block rounded-lg px-4 py-2 bg-red-600 text-white font-medium hover:opacity-95 active:scale-[0.99]"
            >
              Browse movies
            </NavLink>
          </section>
        ) : (
          <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
            {fMovies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
