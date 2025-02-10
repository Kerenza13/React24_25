// PokemonContext.jsx - Corregir addToFavorites y removeFromFavorites
import { createContext, useContext, useState } from "react";
import { toast } from "sonner";

const PokemonContext = createContext();

export function PokemonProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (pokemon) => {
    if (favorites.some(poke => poke.id === pokemon.id)) {
      toast.error("Este pokemon ya está en favoritos", { style: { color: "red" } });
      return;
    }
    setFavorites(prevFavorites => [...prevFavorites, pokemon]);
    toast.success("Pokemon agregado a favoritos");
  };

  const removeFromFavorites = (pokemonId) => {
    setFavorites(prevFavorites => prevFavorites.filter(poke => poke.id !== pokemonId));
    toast.success("Pokemon eliminado de favoritos");
  };

  return (
    <PokemonContext.Provider value={{ addToFavorites, removeFromFavorites, favorites }}>
      {children}
    </PokemonContext.Provider>
  );
}

export const usePokemon = () => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error("usePokemon debe estar dentro del proveedor PokemonProvider");
  }
  return context;
};

// Search.jsx - Implementar búsqueda en tiempo real
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Search = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (search.length === 0) {
      setResults([]);
      return;
    }

    const fetchPokemon = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000`);
        const data = await response.json();
        const filteredResults = data.results.filter(poke => 
          poke.name.toLowerCase().includes(search.toLowerCase())
        );
        setResults(filteredResults);
      } catch (error) {
        toast.error("Error al obtener los pokémones");
      }
    };

    fetchPokemon();
  }, [search]);

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-6'>Busca tu pokemon favorito</h1>
      <input 
        type='text' 
        value={search} 
        placeholder='Buscar Pokémon' 
        onChange={(e) => setSearch(e.target.value)} 
        className='flex-1 p-2 border-gray-200 border rounded-lg focus:ring-rose-500' 
      />
      <ul className='bg-white shadow-lg rounded-lg mt-2'>
        {results.map((poke) => (
          <li 
            key={poke.name} 
            className='p-2 border-b hover:bg-gray-200 cursor-pointer' 
            onClick={() => navigate(`/search/${poke.name}`)}
          >
            {poke.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
