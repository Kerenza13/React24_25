import React, { useEffect, useState } from "react";

const Home = () => {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        fetchPokemons();
        return () => { };
    }, []);

    try {
        const fetchPokemons = async () => {
            const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
            if (!response.ok) {
                throw new Error("Failed to fetch pokemons");
            };
            const data = await response.json();
            // obtenemos los datos d elos pokemons en paralelo
            const pokemonDetails = await Promise.all(
                data.results.map(async (pokemon) => {
                    const res = await fetch(pokemon.url);
                    return res.json();
                })

            );
            setPokemons(pokemonDetails);
        };

    } catch (error) {
        console.log("Error fetchingPokemon", error)

    }

    return( 
    <div>
    <h1>Pokemons Disponibles</h1>
    <div>
        {
            pokemon.map(pokemon=>{
                return(
                    <div key={pokemon.id}>
                        <h2>{pokemon.name}</h2>
                        <img src={pokemon.sprites.front_default} alt={pokemon.name}/>
                    </div>
                )
            })
        }
    </div>
    </div>
)
};

export default Home;
