import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchPokemonDetail } from '../services/api';
import './css/DetailPage.css';

function DetailPage() {
    const { name } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getPokemon() {
            try {
                const data = await fetchPokemonDetail(name);
                setPokemon(data);
                setError(null);
            } catch (err) {
                console.error(err);
                setError('Kunne ikke hente detaljer for denne Pokémon.');
            }
        }
        getPokemon();
    }, [name]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!pokemon) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>{pokemon.name.toUpperCase()}</h1>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />

            <h2>Types:</h2>
            <ul>
                {pokemon.types.map((type) => (
                    <li key={type.type.name}>{type.type.name}</li>
                ))}
            </ul>

            <h2>Abilities:</h2>
            <ul>
                {pokemon.abilities.map((ability) => (
                    <li key={ability.ability.name}>{ability.ability.name}</li>
                ))}
            </ul>

            <h2>Stats:</h2>
            <ul>
                {pokemon.stats.map((stat) => (
                    <li key={stat.stat.name}>
                        {stat.stat.name}: {stat.base_stat}
                    </li>
                ))}
            </ul>

            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
        </div>
    );
}

export default DetailPage;
