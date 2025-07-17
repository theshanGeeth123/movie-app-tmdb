import React from "react";

function MovieCard({movie}) {
  return (
    <div className="group w-full bg-[#292828] rounded-[8px] overflow-hidden text-white cursor-pointer">
      
     
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-black">
        <img
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          
          
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

       
        <div
          className="absolute top-3 right-3 rounded-full bg-black/20 w-10 h-10 flex justify-center
          items-center text-2xl opacity-0 group-hover:opacity-100 hover:bg-black"
        >
          ♥
        </div>
      </div>

    
      <div className="h-20">
        <p className="px-3 py-3 font-semibold">{movie.title}</p>
        <p className="px-3 text-xs text-gray-400">{movie.release_date}</p>
      </div>
    </div>
  );
}

export default MovieCard;
