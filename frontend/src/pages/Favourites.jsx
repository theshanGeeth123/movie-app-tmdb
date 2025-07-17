import React, { useEffect, useState } from 'react';
import MovieCard from "../components/MovieCard";

function Favourites() {

  const [fMovies, setFMovies] = useState([]);

  useEffect(() => {
    const storedMovies = JSON.parse(localStorage.getItem("favs")) || [];
    setFMovies(storedMovies);
  }, []);
  
  return (
     <div className="sm:pt-[60px] max-sm:pt-[120px] w-full bg-[#1b1b1c] min-h-[100vh]">
      <div className=" w-[90%]  m-auto mt-10 bg-[#1b1b1c]">
        <div className="w-full max-w-[80%]  m-auto mb-10">
          <div className="flex justify-center pt-2 gap-x-3 mx-10">

           
          </div>
        </div>

        <div className="w-full  bg-[#1b1b1c] grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pb-10 ">
          
          {
            fMovies.map((movie) => <MovieCard movie={movie} key={movie.id} />)
          }

        </div>
      </div>
    </div>
  )
}

export default Favourites
