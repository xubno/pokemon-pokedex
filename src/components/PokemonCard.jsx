import { Link } from 'react-router-dom';
import './css/PokemonCard.css';

function PokemonCard({ pokemon }) {
    const primaryType = pokemon.types[0]; // Vi tager den første type

    return (
        <Link to={`/detail/${pokemon.name}`} className={`pokemon-card ${primaryType}`}>
            <div className="pokemon-card-content">
                <span className="pokemon-id">#{pokemon.id}</span>
                <img src={pokemon.image} alt={pokemon.name} />
                <h3>{pokemon.name}</h3>
            </div>
        </Link>
    );
}

export default PokemonCard;
