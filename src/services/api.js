import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemonList = async (limit = 20, offset = 0) => {
    try {
        const response = await axios.get(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
        return response.data;
    } catch (error) {
        console.error('Fejl ved hentning af Pokémon-listen:', error);
        throw error;
    }
};

export const fetchPokemonDetail = async (name) => {
    try {
        const response = await axios.get(`${BASE_URL}/pokemon/${name}`);
        return response.data;
    } catch (error) {
        console.error('Fejl ved hentning af Pokémon-detaljer:', error);
        throw error;
    }
};
