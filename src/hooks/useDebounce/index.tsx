import { useState, useEffect } from 'react';

type Config = {
    input: string,
    time: number
}

export const useDebounce = ({ input = '', time = 500 }:Config) => {
    const [debouncedValue, setDebounceValues] = useState(input);

    useEffect(() => {

        let timer = setTimeout(() => {

            setDebounceValues( input );

        }, time)


        return () => {
            clearTimeout(timer);
        }
    }, [input])

    return {
        debouncedValue
    }
}