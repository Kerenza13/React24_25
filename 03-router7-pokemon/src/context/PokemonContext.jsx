import { createContext, useContext, useState } from "react";

// creación del contexto
const PokemonContext = createContext();

// creación del proveedor del contexto
export function PokemonProvider({ children }) {
  // hook
  const [favorites, setFavorites] = useState([])

  const addToFavorites =(pokemon) => {
    // verificamos si el pokemon ya está en favoritos
    if(favorites.some(poke => poke.id === pokemon.id)){
      // lanzamos error con sonner
      return;

    }
    // si no está repetido lo agregamos
    setFavorites((preFavoritos)=>[...preFavoritos, pokemon])

  }
  const removeFromFavorites = (pokemonId) => {};

  return (
    <PokemonContext.Provider value={{}}>{children}</PokemonContext.Provider>
  );
}

// me creo un Hook personalizado para cargar el contexto
export const usePokemon = () => {
  // para usar el contexto hacia:
  const context = useContext(PokemonContext);
  if (context === undefined) {
    throw new Error(
      "usePokemon debe estar dentro del proveedor PokemonProvider"
    );
  }
  return context;
};