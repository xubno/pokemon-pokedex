import { useState, useEffect } from 'react';
import { fetchPokemonList } from '../services/api';
import PokemonList from '../components/PokemonList';
import Pagination from '../components/Pagination';

function PokedexPage() {
    const [pokemon, setPokemon] = useState([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const limit = 20;

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
                    return { ...p, types };
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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Pokédex</h1>
            <input
                type="text"
                placeholder="Søg efter Pokémon"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: '20px', padding: '5px', fontSize: '16px' }}
            />


            <PokemonList pokemon={pokemon} searchTerm={searchTerm} />
            <Pagination handlePrev={handlePrev} handleNext={handleNext} offset={offset} />
        </div>
    );
}

export default PokedexPage;
