// https://pokeapi.co/api/v2/pokemon/?limit=1200;

import { AxiosError } from 'axios';
import { useEffect, useRef, useState } from 'react';
import { PokeApi } from '../../api/pokeAPi';
import { Pokemons, SinglePokemon, PokemonResult } from '../../types/Pokemons';

export const useSearch = () => {
    const [isFetching, setIsFetching] = useState<boolean>(true) 
    const [errors, setError] = useState<Object>({}) 
    const url = useRef('https://pokeapi.co/api/v2/pokemon?limit=1200')
    const [pokemons, setPokemons] = useState<Array<SinglePokemon>>([])
    
    const loadPokemons = async() => {
        try {
            setIsFetching(true)
            const res = await PokeApi.get<Pokemons>(url.current);
            transformPokemonList( res.data.results )
        } catch(e) {
            setIsFetching(false)
            setError(e as AxiosError)
        }
    }

    const transformPokemonList = (pokemons: Array<PokemonResult>) => {
        const newPkList: Array<SinglePokemon> = pokemons.map(({ name, url }) => {
            const urlParts = url.split('/')
            const id = urlParts[urlParts.length - 2];
            const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

            return {
                name,
                id,
                picture,
            }
        })

        setPokemons(newPkList);
        setIsFetching(false)
    }

    useEffect(() => {
        loadPokemons()
    }, [])

    return {
        pokemons,
        isFetching,
        errors,
    }
}