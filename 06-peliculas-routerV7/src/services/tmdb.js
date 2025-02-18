const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;
const VITE_BASE_IMAGE_URL = import.meta.env.VITE_BASE_IMAGE_URL;

// Tamaños de las imagenes
export const SIZE = {
    POSTER: "w500",
    ORIGINAL: "original",

}

// Funcion para hacer fetch a la api url, opciones
export const fetchFromApi = async (endpoint, options = {}) => {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}&language=es-ES`);
        if (!response.ok) {
            throw new Error("Error fetching data");
        }
        const { results } = await response.json();
        return results;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getPopularMovies = async () => {
    return await fetchFromApi("/movie/popular");
};

export const getMovieDetails = async (id) => {
    return await fetchFromApi(`/movie/${id}`)
};

export const getMovieVideos = async (id) => {
    return await fetchFromApi(`/movies/${id}/videos`)
};