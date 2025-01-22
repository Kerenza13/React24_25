import { createContext, useContext, useState } from "react";

// creando el contexto
const PokemonContext = createContext();

// creando el provider del contexto
export function PokemonProvider({ children }) {
    // hook
    const [favorites, setFavorites] = useState([]);

    const addFavorites = (pokemon) => {}
    const removeFavorites = (pokemonId) => {}

    // funcionalidades del provider


  return (
    <PokemonContext.Provider value={{}}>{children}</PokemonContext.Provider>
  );
}

// hook personalizado para el contexto
export const usePokemon = () => {
// para usar el contexto
const context = useContext(PokemonContext);
if (context === undefined) {
  throw new Error("usePokemon must be used within a PokemonProvider");
}
return context;
}