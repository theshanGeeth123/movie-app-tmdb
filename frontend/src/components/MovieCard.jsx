import React ,{ useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';

function MovieCard({ movie }) {
  const [isFavourite, setIsFavourite] = useState(false);

   useEffect(() => {
    AOS.init({
        // ms
      easing: "ease-out",
      offset: 120,     // px from the viewport
      once: true,      // whether animation should happen only once
    });
  }, []);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favs")) || [];
    const exists = favs.some((favMovie) => favMovie.id === movie.id);
    setIsFavourite(exists);
  }, [movie.id]);

  const toggleFavourite = () => {
    const favs = JSON.parse(localStorage.getItem("favs")) || [];
    let updatedFavs;

    if (isFavourite) {
      updatedFavs = favs.filter((favMovie) => favMovie.id !== movie.id);
      if (location.pathname === "/favourites") {
        window.location.reload();
      }
    } else {
      updatedFavs = [...favs, movie];
    }

    localStorage.setItem("favs", JSON.stringify(updatedFavs));
    setIsFavourite(!isFavourite);
  };

  return (
   <>

   
    <div className="group w-full bg-[#292828] rounded-[8px] overflow-hidden text-white cursor-pointer" data-aos="fade-up">
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-black">
        <img
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

        <div
          onClick={toggleFavourite}
          className="absolute top-3 right-3 rounded-full bg-black/20 w-10 h-10 flex justify-center items-center text-2xl opacity-0 group-hover:opacity-100 hover:bg-black"
        >
          {isFavourite ? "❤️" : "🤍"}
        </div>
      </div>
    <Link to={`/movieDetails/${movie.id}`} >
      <div className="h-20">
        <p className="px-3 py-3 font-semibold">{movie.title}</p>
        <p className="px-3 text-xs text-gray-400">{movie.release_date?.split("-")[0]}</p>
      </div>
      </Link>
    </div>

    

    </>
 
  );
}

export default MovieCard;
