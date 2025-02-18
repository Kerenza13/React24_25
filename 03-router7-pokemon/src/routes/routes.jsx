import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layout/RootLayout.jsx";
import { ROUTES } from "./paths";
import  {Home } from "../pages/Home";
import { Search } from "../pages/Search";
import { Favorites } from "../pages/Favorites";
import { PokemonDetail } from "../pages/PokemonDetail";

export const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                path: ROUTES.HOME,
                element: <Home />,
            },
            {
                path: ROUTES.SEARCH,
                element: <Search />,
            },
            {
                path: ROUTES.FAVORITES,
                element: <Favorites />,
            },
            {
                path: ROUTES.POKEMON_DETAIL,
                element: <PokemonDetail />,
            }
        ],
    },
]);
