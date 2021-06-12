import * as React from 'react';
import { ActivityIndicator, FlatList, Image, Text, View, Dimensions, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SearchInput } from '../../Components/SearchInput';
import { appTheme } from '../../theme/appTheme';
import { useSearch } from '../../hooks/useSearch/index';
import { PokemonCard } from '../../Components/PokemonCard';
import { PokemonDetails, SinglePokemon } from '../../types/Pokemons';

const screenWidth = Dimensions.get('screen').width

export const SearchScreen = () => {
    const { top } = useSafeAreaInsets()
    const { isFetching, pokemons } = useSearch();
    const [criteria, setCriteria] = React.useState<string>('')
    const [filteredPokemons, setFilteredPokemons] = React.useState<Array<SinglePokemon>>([]);

    React.useEffect(() => {
        if (criteria.length === 0) {
            return setFilteredPokemons([])
        }

        if (isNaN(Number(criteria))) {
            setFilteredPokemons(
                pokemons.filter(pokemon =>
                    pokemon.name
                        .trim()
                        .toLocaleLowerCase()
                        .includes(
                            criteria
                                .trim()
                                .toLocaleLowerCase()
                        )
                )
            )
        } else {
            const found = pokemons.find(poke => poke.id === criteria);
            setFilteredPokemons(
                (found) ? [found] : []
            )
        }
    }, [criteria])

    if (isFetching) {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#121212',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Image
                    source={require('../../assets/pokebola.png')}
                    style={[appTheme.pokeBallBackground, { zIndex: 100, opacity: 1 }]}
                />
                <ActivityIndicator
                    color={'#ffaa00'}
                    size={45}
                />
            </View>
        )
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{
                flex: 1
            }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <View
                    style={{
                        flex: 1,
                        marginHorizontal: 20
                    }}
                >
                    <Image
                        source={require('../../assets/pokebola.png')}
                        style={appTheme.pokeBallBackground}
                    />
                    <SearchInput
                        style={{
                            position: 'absolute',
                            zIndex: 999,
                            marginTop: top + 30,
                            width: screenWidth * 0.9
                        }}
                        onDebounce={setCriteria}
                    />


                    <FlatList
                        data={filteredPokemons}
                        keyExtractor={pokemon => pokemon.id}
                        showsVerticalScrollIndicator={false}
                        numColumns={1}
                        ListHeaderComponent={() => {
                            return <Text style={[
                                appTheme.title,
                                appTheme.globalMargin,
                                { marginTop: top + 90, marginBottom: 10 }
                            ]}>{criteria}</Text>
                        }}
                        renderItem={({ item }) => {
                            return (
                                <>
                                    <PokemonCard pokemon={item} full />
                                </>
                            )
                        }}
                    />
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}