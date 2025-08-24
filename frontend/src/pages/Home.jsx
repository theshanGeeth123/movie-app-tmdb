import React, { useEffect, useState, useRef } from "react";
import MovieCard from "../components/MovieCard";
import { getPopularMovies, searchMovies } from "../Services/Api";

/**
 * Mobile-first, accessible, and responsive Home component
 * FIXED: Search input not visible on some layouts
 *  - Restores page top padding to avoid overlap with any global fixed navbar
 *  - Moves search bar into normal flow (non-sticky) for maximum compatibility
 *  - Ensures high z-index is not required; adds clear visual ring/border
 */
export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const debounceTimeout = useRef(null);
  const isMounted = useRef(true);

  // Load popular movies on mount
  useEffect(() => {
    isMounted.current = true;
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        if (isMounted.current) setMovies(popularMovies);
      } catch (error) {
        console.log(error);
      } finally {
        if (isMounted.current) setLoading(false);
      }
    };
    loadPopularMovies();
    return () => {
      isMounted.current = false;
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, []);

  // Debounced search on query change
  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      const run = async () => {
        setLoading(true);
        try {
          if (searchQuery.trim() === "") {
            const popularMovies = await getPopularMovies();
            if (isMounted.current) setMovies(popularMovies);
          } else {
            const results = await searchMovies(searchQuery);
            if (isMounted.current) setMovies(results);
          }
        } catch (error) {
          console.log(error);
        } finally {
          if (isMounted.current) setLoading(false);
        }
      };
      run();
    }, 450);

    return () => clearTimeout(debounceTimeout.current);
  }, [searchQuery]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    setLoading(true);
    try {
      if (searchQuery.trim() === "") {
        const popularMovies = await getPopularMovies();
        if (isMounted.current) setMovies(popularMovies);
      } else {
        const searchResults = await searchMovies(searchQuery);
        if (isMounted.current) setMovies(searchResults);
      }
    } catch (error) {
      console.log(error);
    } finally {
      if (isMounted.current) setLoading(false);
    }
  };

  const handleClear = () => setSearchQuery("");

  return (
    <div className="sm:pt-[60px] max-sm:pt-[120px] w-full bg-[#1b1b1c] min-h-screen">
      <div className="w-[92%] max-w-6xl mx-auto">
        {/* SEARCH BAR (non-sticky for compatibility) */}
        <section className="pt-4 sm:pt-6 flex justify-center">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 sm:gap-3 min-w-[500px] max-md:min-w-[300px]" role="search" aria-label="Movie search">
            <label htmlFor="movie-search" className="sr-only">Search for movies</label>
            <input
              id="movie-search"
              type="search"
              inputMode="search"
              enterKeyHint="search"
              placeholder="Search for movies..."
              className="w-full text-white placeholder-white/70 bg-[#2a2a2c] rounded-lg py-3 px-4 outline-none ring-1 ring-white/15 focus:ring-2 focus:ring-white/40 border border-white/10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoComplete="off"
            />
            <div className="flex gap-2">
              {/* <button
                type="submit"
                className="flex-1 sm:flex-none rounded-lg px-4 py-3 text-white font-medium bg-red-600 active:scale-[0.99] transition"
              >
                Search
              </button> */}
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="rounded-lg px-4 py-3 text-white font-medium bg-white/10 hover:bg-white/15 active:scale-[0.99] transition"
                >
                  Clear
                </button>
              )}
            </div>
          </form>
        </section>

        {/* STATUS */}
        <div className="mt-3 mb-4 text-white/70 text-sm">
          {searchQuery ? (
            <span>Showing results for <span className="text-white font-medium">“{searchQuery}”</span></span>
          ) : (
            <span>Popular movies</span>
          )}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5 pb-12">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-lg bg-white/5 aspect-[2/3]" aria-hidden="true" />
            ))
          ) : movies && movies.length > 0 ? (
            movies.map((movie) => <MovieCard movie={movie} key={movie.id} />)
          ) : (
            <div className="col-span-full text-center text-white/80 py-10">No movies found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
