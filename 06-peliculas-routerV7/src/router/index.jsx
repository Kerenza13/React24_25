import { Children } from "react";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import MovieList from "../pages/MovieList";
import MovieDetail from "../pages/MovieDetail";
import ErrorPage from "../pages/ErrorPage";
import Search from "../pages/Search";
import Reviews from "../pages/Reviews";
import Favorites from "../pages/Favorites";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        Children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "movies",
                element: <MovieList />
            },
            {
                path: "movie/:id",
                element: <MovieDetail />
            },
            {
                path: "search",
                element: <Search />
            },
            {
                path: "reviews",
                element: <Reviews />
            },
            {
                path: "favotites",
                element: <Favorites />
            },
        ]
    }
])