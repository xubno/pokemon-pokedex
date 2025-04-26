import { Link } from 'react-router-dom';
import PokemonCard from './PokemonCard';
import './css/PokemonList.css';

function PokemonList({ pokemon, searchTerm }) {
    const getPokemonImage = (url) => {
        const id = url.split('/').filter(Boolean).pop();
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    };

    const getCardColor = (types) => {
        if (types.includes('grass')) return '#4caf50';
        if (types.includes('water')) return '#2196f3';
        if (types.includes('fire')) return '#ff5722';
        if (types.includes('electric')) return '#ffeb3b';
        if (types.includes('normal')) return '#cfcfcf';
        if (types.includes('fighting')) return '#d32f2f';
        if (types.includes('flying')) return '#add8e6';
        if (types.includes('poison')) return '#a020f0';
        if (types.includes('ground')) return '#8b4513';
        if (types.includes('bug')) return '#8bc34a';
        if (types.includes('ghost')) return '#6a0dad';
        if (types.includes('steel')) return '#4682b4';
        if (types.includes('psychic')) return '#f57878';
        if (types.includes('ice')) return '#8bfaff';
        if (types.includes('dragon')) return '#00008b';
        if (types.includes('dark')) return '#000000';
        if (types.includes('fairy')) return '#f8bbd0';
        return '#f7f7f7';
    };

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {pokemon
                .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((p) => (
                    <Link
                        key={p.name}
                        to={`/about/${p.name}`}
                        style={{ textDecoration: 'none', color: 'black' }}
                    >
                        <PokemonCard
                            pokemon={{
                                id: p.url.split('/').filter(Boolean).pop(),
                                name: p.name,
                                image: getPokemonImage(p.url),
                                types: p.types
                            }}
                        />
                    </Link>
                ))}
        </div>
    );
}

export default PokemonList;
