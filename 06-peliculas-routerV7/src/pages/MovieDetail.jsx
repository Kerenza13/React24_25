import { useParams } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import { useFetch } from "../hooks/useFetch";
import { getImageURL, getMovieDetail, getMovieVideos } from "../services/tmdb";

const MovieDetail = () => {
  const { id } = useParams();
  const { data: movieData, loading: movieLoading, error: movieError } = useFetch(
    () => getMovieDetail(id),
    [id]
  );
  const { data: videosData, loading: videosLoading } = useFetch(
    () => getMovieVideos(id),
    [id]
  );

  if (movieError) {
    const trailer = videosData?.results?.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );

  return (
      <div className="text-center py-10">
        <p className="text-red-700">Error al cargar la película {movieError}</p>
      </div>
    );
  }
  if (movieLoading) {
    return <PacmanLoader color="#15387b" />;
  }
  const trailer = videosData?.results?.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );

  return (
    <article className="max-w-4xl mx-auto">
      <header className="relative h-96 mb-8">
        <img
          src={getImageURL(movieData?.backdrop_path, "original")}
          alt={movieData?.title}
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent">
          <div className="absolute bottom-2 text-white p-6">
            <h1 className="text-4xl font-bold">{movieData?.title}</h1>
          </div>
        </div>
      </header>
      {/* contenido principal */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* poster */}
        <div>
          <img
            className="w-full rounded-lg mb-10 "
            src={getImageURL(movieData?.poster_path)}
            alt={movieData?.title}
          />
        </div>
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center gap-4 text-sm text-gray-700">
            <span className="font-bold mt-4">
              {movieData?.release_date.split("-")[0]}
            </span>
            <span className="font-bold mt-4">{movieData?.runtime} minutos</span>
            <span className="font-bold mt-4">
              {Number(movieData?.vote_average).toFixed(1)}⭐
            </span>
          </div>
          <section className="flex flex-wrap gap-2">
            {movieData?.genres?.map((genre) => (
              <span
                key={genre.id}
                className="bg-sky-100 text-sky-900 px-3 py-1 rounded-full text-sm font-semibold"
              >
                {genre.name}
              </span>
            ))}
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">Sinopsis</h2>
            <p className="text-gray-700">{movieData?.overview}</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">Tráiler</h2>
            {videosLoading ? (
              <PacmanLoader color="#15387b" size={20} />
            ) : trailer ? (
              <div className="aspect-video">
                <iframe
                  className="w-full h-full rounded-lg"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title={`${movieData?.title} Trailer`}
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <p className="text-gray-700">No hay tráiler disponible</p>
            )}
          </section>
        </div>
      </div>
    </article>
  );
};

export default MovieDetail;