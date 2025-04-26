import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchPokemonDetail } from '../services/api';
import './css/AboutPage.css';

function AboutPage() {
    const { name } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getPokemon() {
            try {
                console.log("Forsøger at hente:", name);
                setLoading(true);
                const data = await fetchPokemonDetail(name);
                console.log("Modtaget data:", data);
                setPokemon(data);
                setError(null);
            } catch (err) {
                console.error("Fejl ved hentning:", err);
                setError('Kunne ikke hente detaljer for denne Pokémon.');
            } finally {
                setLoading(false);
            }
        }

        if (name) {
            getPokemon();
        }
    }, [name]);

    if (loading) {
        return <div className="detail-container">Loading...</div>;
    }

    if (error) {
        return <div className="detail-container">{error}</div>;
    }

    if (!pokemon) {
        return <div className="detail-container">Ingen data fundet for denne Pokémon.</div>;
    }

    return (
        <div className="detail-container">
            <Link to="/" className="back-button">← Tilbage til listen</Link>
            <h1>{pokemon.name.toUpperCase()}</h1>
            <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                style={{ width: '200px', height: '200px' }}
            />

            <div className="detail-info">
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

                <p>Height: {pokemon.height / 10} meters</p>
                <p>Weight: {pokemon.weight / 10} kg</p>
            </div>
        </div>
    );
}

export default AboutPage;