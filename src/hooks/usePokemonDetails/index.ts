import { useEffect, useState } from 'react';
import { PokemonDetails } from '../../types/Pokemons';
import { PokeApi } from '../../api/pokeAPi';


export const usePokemonDetails = (id: string) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [pokemonDetail, setPokemon] = useState<PokemonDetails>({} as PokemonDetails);

    const loadPokemons = async () => {
        try {
            const res = await PokeApi.get<PokemonDetails>(`https://pokeapi.co/api/v2/pokemon/${id}`);
            setPokemon( res.data )

            setIsLoading(false)
        } catch (error) {
            
        }
    }
    useEffect(() => {
        loadPokemons()
    }, [])

    return {
        isLoading,
        pokemonDetail
    }
}