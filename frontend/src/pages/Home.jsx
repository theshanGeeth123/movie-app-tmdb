import React, { useEffect, useRef, useState } from "react";
import MovieCard from "../components/MovieCard";
import { getPopularMovies, searchMovies } from "../Services/Api";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);   // skeleton only on first paint
  const [searchLoading, setSearchLoading] = useState(false);    // subtle spinner on input
  const [searchQuery, setSearchQuery] = useState("");

  const debounceTimeout = useRef(null);
  const isMounted = useRef(true);
  const requestIdRef = useRef(0); // guards against stale responses

  // ---- Helpers --------------------------------------------------------------
  const runRequest = async (fn) => {
    const myId = ++requestIdRef.current;
    try {
      const data = await fn();
      // Ignore if a newer request started since this one
      if (!isMounted.current || myId !== requestIdRef.current) return;
      setMovies(Array.isArray(data) ? data : []);
    } catch (err) {
      // You can toast this if you have a toaster
      console.error(err);
      if (!isMounted.current || myId !== requestIdRef.current) return;
      // Keep previous list on error so UI doesn’t go blank
    }
  };

  // ---- Initial load: popular movies ----------------------------------------
  useEffect(() => {
    isMounted.current = true;

    (async () => {
      setInitialLoading(true);
      await runRequest(getPopularMovies);
      if (isMounted.current) setInitialLoading(false);
    })();

    return () => {
      isMounted.current = false;
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
      // bump requestId so any late responses are ignored
      requestIdRef.current++;
    };
  }, []);

  // ---- Debounced search -----------------------------------------------------
  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(async () => {
      // If empty -> show popular, but don’t flash skeleton
      setSearchLoading(true);
      await runRequest(
        searchQuery.trim() === "" ? getPopularMovies : () => searchMovies(searchQuery)
      );
      if (isMounted.current) setSearchLoading(false);
    }, 450);

    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [searchQuery]);

  // ---- Handlers -------------------------------------------------------------
  const handleSearch = async (e) => {
    e.preventDefault();
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    setSearchLoading(true);
    await runRequest(
      searchQuery.trim() === "" ? getPopularMovies : () => searchMovies(searchQuery)
    );
    if (isMounted.current) setSearchLoading(false);
  };

  const handleClear = () => setSearchQuery("");

  // ---- UI -------------------------------------------------------------------
  const showSkeleton = initialLoading;
  const showEmpty = !showSkeleton && !searchLoading && movies?.length === 0;

  return (
    <div className="sm:pt-[60px] max-sm:pt-[120px] w-full bg-[#1b1b1c] min-h-screen">
      <div className="w-[92%] max-w-6xl mx-auto">
        {/* SEARCH BAR */}
        <section className="pt-4 sm:pt-6 flex justify-center">
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row gap-2 sm:gap-3 min-w-[500px] max-md:min-w-[300px]"
            role="search"
            aria-label="Movie search"
          >
            <label htmlFor="movie-search" className="sr-only">
              Search for movies
            </label>

            <div className="relative w-full">
              <input
                id="movie-search"
                type="search"
                inputMode="search"
                enterKeyHint="search"
                placeholder="Search for movies..."
                className="w-full text-white placeholder-white/70 bg-[#2a2a2c] rounded-lg py-3 pl-4 pr-10 outline-none ring-1 ring-white/15 focus:ring-2 focus:ring-white/40 border border-white/10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoComplete="off"
                aria-busy={searchLoading ? "true" : "false"}
              />
              {/* Subtle inline spinner during search (keeps grid steady) */}
              {searchLoading && (
                <svg
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 animate-spin"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" className="opacity-25" />
                  <path
                    d="M4 12a8 8 0 0 1 8-8"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    className="opacity-75"
                  />
                </svg>
              )}
            </div>

            <div className="flex gap-2">
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="rounded-lg px-4 py-3 text-white font-medium bg-white/10 hover:bg白/15 hover:bg-white/15 active:scale-[0.99] transition"
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
            <span>
              Showing results for <span className="text-white font-medium">“{searchQuery}”</span>
            </span>
          ) : (
            <span>Popular movies</span>
          )}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5 pb-12">
          {showSkeleton
            ? Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse rounded-lg bg-white/5 aspect-[2/3]" aria-hidden="true" />
              ))
            : showEmpty
            ? (
              <div className="col-span-full text-center text-white/80 py-10">No movies found.</div>
            )
            : (
              movies.map((m) => <MovieCard movie={m} key={m.id} />)
            )}
        </div>
      </div>
    </div>
  );
}
