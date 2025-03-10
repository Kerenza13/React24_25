import { useState } from "react";
import { Link } from "react-router-dom";
import PacmanLoader from "react-spinners/PacmanLoader";
import MovieCard from "../components/MovieCard";
import { useFetch } from "../hooks/useFetch";
import { getPopularMovies } from "../services/tmdb";

const MovieList = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [minRating, setMinRating] = useState(0);

  const { data, loading, error } = useFetch(
    () => getPopularMovies(page),
    [page]
  );

  const handlePageChange = (newPage) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPage(newPage);
  };

  const filteredMovies = data?.results?.filter(
    (movie) => movie.vote_average >= minRating
  );

  const sortedMovies = [...(filteredMovies || [])].sort((a, b) => {
    if (sortBy === "popularity.desc") return b.popularity - a.popularity;
    if (sortBy === "vote_average.desc") return b.vote_average - a.vote_average;
    if (sortBy === "release_date.desc")
      return new Date(b.release_date) - new Date(a.release_date);
    return 0;
  });

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-2xl font-bold text-red-500">
          Error al cargar las películas {error}
        </p>
        <Link to="/" className="text-blue-500">
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 mx-10">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-sky-950">Catálogo de Películas</h1>
      </header>

      <div className="flex flex-wrap gap-4 items-center justify-center bg-gray-100 p-4 rounded-lg">
        <div className="space-x-2">
          <label className="font-bold text-sky-900">Ordenar por:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 rounded border border-gray-300"
          >
            <option value="popularity.desc">Popularidad</option>
            <option value="vote_average.desc">Puntuación</option>
            <option value="release_date.desc">Fecha de estreno</option>
          </select>
        </div>

        <div className="space-x-2">
          <label className="font-bold text-sky-900">Puntuación mínima:</label>
          <select
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
            className="p-2 rounded border border-gray-300"
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((rating) => (
              <option key={rating} value={rating}>
                {rating}+ ⭐
              </option>
            ))}
          </select>
        </div>
      </div>

      <section>
        {loading ? (
          <div className="flex justify-center">
            <PacmanLoader color="#15387b" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {sortedMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            <div className="flex justify-center mt-8 gap-2 mb-10">
              <button
                className="bg-sky-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 disabled:bg-gray-400"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
              >
                Anterior
              </button>
              <span className="text-gray-800 flex items-center">
                Página {data?.page} de {data?.total_pages}
              </span>
              <button
                className="bg-sky-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 disabled:bg-gray-400"
                onClick={() => handlePageChange(page + 1)}
                disabled={page === data?.total_pages}
              >
                Siguiente
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default MovieList;