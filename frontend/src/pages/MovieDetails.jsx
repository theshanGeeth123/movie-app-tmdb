import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { getMovieById } from "../Services/Api.js";

function MovieDetails() {
  const movieId = useParams().id;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const data = await getMovieById(movieId);
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [movieId]);

  if (loading) return <div className="text-white p-6">Loading...</div>;

  if (!movie) return <div className="text-red-500 p-6">Movie not found</div>;

  return (
    <div className="bg-[#1a1a1a] min-h-screen text-white px-4 sm:px-8 pt-32 pb-12">
      <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full sm:w-[300px] max-w-xs sm:max-w-sm md:max-w-none rounded-lg shadow-lg object-cover mx-auto lg:mx-0"
        />

        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">{movie.title}</h1>
          <p className="text-gray-400 text-sm sm:text-base mb-4">
            {movie.release_date} • ⭐ {movie.vote_average}
          </p>

          <div className="mb-4 flex flex-wrap">
            {movie.genres?.map((g) => (
              <span
                key={g.id}
                className="inline-block bg-blue-700 text-white px-3 py-1 rounded-full text-xs sm:text-sm mr-2 mb-2"
              >
                {g.name}
              </span>
            ))}
          </div>

          <p className="text-gray-300 text-sm sm:text-base mb-6 leading-relaxed">
            {movie.overview}
          </p>

          {movie.homepage && (
            <a
              href={movie.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-red-600 hover:bg-red-700 transition duration-200 px-4 py-2 rounded text-white font-semibold text-sm sm:text-base"
            >
              Official Website
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
