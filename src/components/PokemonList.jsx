import { useState, useEffect } from 'react';
import { fetchPokemonList } from '../services/api';
import { Link } from 'react-router-dom';
import './css/PokemonList.css';

function PokemonList() {
    const [pokemon, setPokemon] = useState([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const limit = 20;
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const loadPokemon = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchPokemonList(limit, offset);
                const pokemonWithTypes = await Promise.all(data.results.map(async (p) => {
                    const response = await fetch(p.url);
                    const pokemonData = await response.json();
                    const types = pokemonData.types.map(t => t.type.name);
                    return { ...p, types }; // Add types to the Pokémon data
                }));
                setPokemon(pokemonWithTypes);
            } catch (error) {
                console.error(error);
                setError('Kunne ikke hente Pokémon listen.');
            } finally {
                setLoading(false);
            }
        };

        loadPokemon();
    }, [offset]);

    const handleNext = () => {
        setOffset(prev => prev + limit);
    };

    const handlePrev = () => {
        setOffset(prev => Math.max(prev - limit, 0));
    };

    const getPokemonImage = (url) => {
        const id = url.split('/').filter(Boolean).pop();
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    };

    const getCardColor = (types) => {
        if (types.includes('grass')) return '#4caf50'; // Grøn
        if (types.includes('water')) return '#2196f3'; // Blå
        if (types.includes('fire')) return '#ff5722'; // Orange
        if (types.includes('electric')) return '#ffeb3b'; // Gul
        if (types.includes('normal')) return '#cfcfcf'; // Grå
        if (types.includes('fighting')) return '#d32f2f'; // Rød
        if (types.includes('flying')) return '#add8e6'; // Lyseblå
        if (types.includes('poison')) return '#a020f0'; // Lilla
        if (types.includes('ground')) return '#8b4513'; // Brun
        if (types.includes('bug')) return '#8bc34a'; // Lysegrøn
        if (types.includes('ghost')) return '#6a0dad'; // Mørkelilla
        if (types.includes('steel')) return '#4682b4'; // Stålblå
        if (types.includes('psychic')) return '#f57878'; // Rød-hvid
        if (types.includes('ice')) return '#8bfaff'; // Blå-hvid
        if (types.includes('dragon')) return '#00008b'; // Mørkeblå
        if (types.includes('dark')) return '#000000'; // Sort
        if (types.includes('fairy')) return '#f8bbd0'; // Lyserød
        return '#f7f7f7'; // Standard farve
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Pokédex</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <input
                    type="text"
                    placeholder="Søg efter Pokémon"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ marginBottom: '20px', padding: '5px', fontSize: '16px' }}
                />

                {pokemon
                    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((p) => (
                        <Link
                            key={p.name}
                            to={`/detail/${p.name}`}
                            style={{ textDecoration: 'none', color: 'black' }}
                        >
                            <div style={{ textAlign: 'center', width: '100px', backgroundColor: getCardColor(p.types) }}>
                                <img src={getPokemonImage(p.url)} alt={p.name} />
                                <p>{p.name}</p>
                            </div>
                        </Link>
                    ))}
            </div>
            <div style={{ marginTop: '20px' }}>
                <button onClick={handlePrev} disabled={offset === 0}>Forrige</button>
                <button onClick={handleNext}>Næste</button>
            </div>
        </div>
    );
}

export default PokemonList;
