import * as React from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View, Image } from 'react-native';
import { SinglePokemon } from '../../types/Pokemons';
import { FadeInImage } from '../FadeInIamge';
import ImageColors from 'react-native-image-colors'
import { useNavigation } from '@react-navigation/core';

type PokemonCardProperties = {
    pokemon: SinglePokemon,
    full?: boolean
}

const { width: screenWidth } = Dimensions.get('window');

export const PokemonCard: React.FC<PokemonCardProperties> = ({ pokemon, full = false }) => {
    const isMounted = React['useRef'](true);
    const { id, name, picture } = pokemon;
    const [cardColor, setCarColor] = React.useState('#ffaa00')
    const navigator = useNavigation();

    React['useEffect'](() => {
        ImageColors.getColors(picture, { fallback: '#ffaa00'}).then(colors => {
            if (!isMounted.current) return;

            if (colors.platform == 'ios') {
                setCarColor(colors.background || '#ffaa00')
            } else {
                setCarColor(colors.dominant || '#ffaa00')
            }
        })
        

        return () => {
            isMounted.current = false
        }
    }, [])

    return (
        <Pressable
            onPress={() => navigator.navigate<'details'>('details', {pokemon, color: cardColor})}
            style={[pokeCard.container, { width: full ?  screenWidth * 0.85 : screenWidth * 0.4, backgroundColor: cardColor, shadowColor: cardColor }]}
        >
            <View style={[pokeCard.pkbContainer , { width: full ?  screenWidth * 0.85 : screenWidth * 0.4 }]}>
                <Image
                    source={require('../../assets/pokebola-blanca.png')}
                    style={pokeCard.pkb}
                />
            </View>
            <Text style={pokeCard.title}>{name}{'\n#' + id}</Text>
            <FadeInImage
                uri={picture}
                style={pokeCard.pki}
            />

        </Pressable>
    )
}

const pokeCard = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        height: 120,
        marginBottom: 25,
        borderRadius: 15,

        // shadowColor: "rgba(0,0,0,.8)",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.8,
        shadowRadius: 6.68,

        elevation: 11,
    },
    title: {
        color: '#fff',
        fontWeight: "bold",
        fontSize: 20,
        top: 5,
        left: 10
    },
    pki: {
        width: 110,
        height: 110,
        position: 'absolute',
        right: -8,
        bottom: -10
    },
    pkbContainer: {
        height: 100,
        position: 'absolute',
        overflow: 'hidden',
        bottom: 0,
        right: 0,
        opacity: 0.5
    },
    pkb: {
        width: 120,
        height: 120,
        position: 'absolute',
        bottom: -30,
        right: -30,
    }
})