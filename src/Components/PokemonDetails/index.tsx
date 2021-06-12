import * as React from 'react';
import { Text, View, Dimensions, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { PokemonDetails } from '../../types/Pokemons';
import { FadeInImage } from '../FadeInIamge';

type PkDetails = {
    pokemon: PokemonDetails,
    color: string
}
const { width: screenWidth } = Dimensions.get('window');

export const PokemonDetail:React.FC<PkDetails> = ({ pokemon, color }) => {

    return (
        <View style={[styles.container]}>
            {/* types */}
            <View>
                <Text style={[styles.title, { color }]}>Types</Text>
                <View style={{ flexDirection: 'row', }}>
                    {
                        pokemon.types.map(({type}) => {
                            return <Text style={styles.types} key={type.name}>{type.name}</Text>
                        })
                    }
                </View>
                <Text style={[styles.title, { color }]}>Stats</Text>
                <ScrollView style={{ flexDirection: 'row', }}>
                    {
                        pokemon.stats.map(({stat, base_stat}) => {
                            return <View key={stat.name} style={{ flexDirection: 'row', width: screenWidth * .9, justifyContent: 'space-between'}}>
                                <Text style={styles.types}>{stat.name}</Text>
                                <Text style={{fontSize: 16, color, fontWeight: 'bold'}}>{base_stat}</Text>
                            </View>
                        })
                    }
                </ScrollView>   
            </View>
            {/* Sprites */}
            <View style={{  }}>
                <Text style={[styles.title, { color }]}>Sprites</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    <FadeInImage 
                        uri={pokemon.sprites.front_default}
                        style={styles.sprite}
                    />
                    <FadeInImage 
                        uri={pokemon.sprites.back_default}
                        style={styles.sprite}
                    />
                    <FadeInImage 
                        uri={pokemon.sprites.front_shiny}
                        style={styles.sprite}
                    />
                    <FadeInImage 
                        uri={pokemon.sprites.back_shiny}
                        style={styles.sprite}
                    />
                </ScrollView>
            </View>
            {/* Abilities */}
            <View>
                <Text style={[styles.title, { color }]}>Abilities</Text>
                <View style={{ flexDirection: 'row', }}>
                    {
                        pokemon.abilities.map(({ability}) => {
                            return <Text style={styles.types} key={ability.name}>{ability.name}</Text>
                        })
                    }
                </View>
            </View>
            {/* Moves */}
            <View>
                <Text style={[styles.title, { color }]}>Moves</Text>
                <View style={{  }}>
                    {
                        <Text style={styles.types}>{pokemon.moves.map(({move}) => move.name).join(' ,  ')}</Text>
                    }
                </View>
            </View>

            <View 
                style={{ alignItems: 'center', alignContent: 'center' ,height: 125, marginTop: 20}}
            >
                <FadeInImage 
                    uri={pokemon.sprites.other?.['official-artwork'].front_default as string}
                    style={styles.sprite}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginTop: 40
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        marginTop: 20
    },
    types: {
        marginRight: 10,
        fontSize: 18,
        textTransform: 'capitalize'
    },
    sprite: {
        width: 100,
        height: 100
    }
})