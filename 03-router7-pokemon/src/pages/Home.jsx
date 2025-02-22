import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../routes/paths";
import { usePokemon } from "../context/PokemonContext";

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addFavorites } = usePokemon();
  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=50"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch pokemons");
      }
      const data = await response.json();
      // obtenemos los datos de los pokemons en PARALELO
      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          return res.json();
        })
      );
      setPokemons(pokemonDetails);
    } catch (error) {
      console.log("Error fetchingPokemon", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Pokemons Disponibles</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pokemons.map((pokemon) => (
          <div
            key={pokemon.id} // id del pokemon
            className=" bg-white rounded-xl p-6 hover:shadow-ssm"
          >
            <div className="relative group">
              <img
                className="mx-auto"
                src={pokemon.sprites.other.showdown.front_default}
                alt={pokemon.name}
              />
              <h2 className="text-xl font-bold text-center mt-4">
                {pokemon.name}
              </h2>
              <div className="flex justify-center space-x-2 mt-4">
                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-slate-900" onClick={()=> addFavorites(pokemon)}>
                  Añadir a favoritos
                </button>
                {/* voy a ir a ver los detalles usando elementos de react router */}
                <Link
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-slate-900"
                  to={`${ROUTES.SEARCH}/${pokemon.name}`}
                >
                  Ver Detalles
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;