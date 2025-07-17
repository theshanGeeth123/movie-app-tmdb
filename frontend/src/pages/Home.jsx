import React, { useEffect, useState, useRef } from "react";
import MovieCard from "../components/MovieCard";
import { getPopularMovies, searchMovies } from "../Services/Api";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const debounceTimeout = useRef(null);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);

  useEffect(() => {
 
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      if (searchQuery.trim() === "") {
        setLoading(true);
        getPopularMovies()
          .then((popularMovies) => setMovies(popularMovies))
          .catch(console.log)
          .finally(() => setLoading(false));
      } else {
        
        setLoading(true);
        searchMovies(searchQuery)
          .then((results) => setMovies(results))
          .catch(console.log)
          .finally(() => setLoading(false));
      }
    }, 500); 

    return () => clearTimeout(debounceTimeout.current);
  }, [searchQuery]);

  
  const handleSearch = async (e) => {
    e.preventDefault();

   
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    setLoading(true);

    try {
      if (searchQuery.trim() === "") {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } else {
        const searchResults = await searchMovies(searchQuery);
        setMovies(searchResults);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sm:pt-[60px] max-sm:pt-[120px] w-full bg-[#1b1b1c] min-h-[100vh]">
      <div className="w-[90%] m-auto mt-10 bg-[#1b1b1c]">
        <div className="w-full max-w-[80%] m-auto mb-10">
          <div className="flex justify-center pt-2 gap-x-3 mx-10">
            <form onSubmit={handleSearch} className="whitespace-nowrap">
              <input
                type="text"
                placeholder="Search for movies..."
                className="bg-[#5d5d5f] min-w-[300px] max-w-[400px] text-white py-3 px-4 border-2 border-transparent 
              focus:border-white outline-none transition-colors duration-200
              rounded-[5px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="bg-red-600 w-[80px] rounded-[5px] text-white min-w-[80px] cursor-pointer ml-2 h-full"
              >
                Search
              </button>
            </form>
          </div>
        </div>

        <div className="w-full bg-[#1b1b1c] grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pb-10 ">
          {loading ? (
            <div className="text-white">Loading ...</div>
          ) : movies.length > 0 ? (
            movies.map((movie) => <MovieCard movie={movie} key={movie.id} />)
          ) : (
            <div className="text-white">No movies found.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
