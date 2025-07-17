import React from "react";
import MovieCard from "../components/MovieCard";
import { getPopularMovies } from "../Services/Api";
import { useEffect, useState } from "react";

function Home() {


  const [movies,setMovies] = useState([]);

  const [loading,setLoading] = useState(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        console.log("Popular movies:", popularMovies);
        setMovies(popularMovies);
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false);
      }
    };

    loadPopularMovies();

  }, []);




  return (
    <div className="sm:pt-[60px] max-sm:pt-[120px] w-full bg-[#1b1b1c] min-h-[100vh]">
      <div className=" w-[90%]  m-auto mt-10 bg-[#1b1b1c]">
        <div className="w-full max-w-[80%]  m-auto mb-10">
          <div className="flex justify-center pt-2 gap-x-3 ">
            <input
              type="text"
              placeholder="Search for movies..."
              className="bg-[#5d5d5f] w-[400px] text-white py-3 px-4 border-2 border-transparent 
              focus:border-white outline-none transition-colors duration-200
              rounded-[5px]"
            />
            <button className="bg-red-600 w-[80px] rounded-[5px] text-white min-w-[80px] cursor-pointer">
              Search
            </button>
          </div>
        </div>

        <div className="w-full  bg-[#1b1b1c] grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pb-10 ">
          
          {loading ? (
            <div className="text-white">Loading ...</div>
          ) : (
            movies.map((movie) => <MovieCard movie={movie} key={movie.id} />)
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
