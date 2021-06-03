import * as React from 'react';
import {Image, Text, View,FlatList, ActivityIndicator} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { appTheme } from '../../theme/appTheme';
import { usePokemon } from '../../hooks/usePokemon/index';
import { PokemonCard } from '../../Components/PokemonCard';

export const HomeScreen = () => {
  const { top } = useSafeAreaInsets()
  const { pokemons, errors, loadPokemons } = usePokemon();
  return (
    <View style={{ alignItems: 'center' }}>
      <Image 
        source={ require('../../assets/pokebola.png')}
        style={appTheme.pokeBallBackground}
      />
      <FlatList 
        data={pokemons}
        keyExtractor={pokemon => pokemon.id}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        ListHeaderComponent={() => {
          return <Text style={[appTheme.title, appTheme.globalMargin,{ top: top + 20, marginBottom: top + 40 }]}>Pokedex</Text>
        }}
        renderItem={({item}) => {
          return (
            <>
              <PokemonCard pokemon={item}/>
            </>
          )
        }}
        //
        onEndReached={() => loadPokemons()}
        onEndReachedThreshold={0.4}
        ListFooterComponent={<ActivityIndicator style={{ height: 100 }} color={'#ffaa00'} size={24}/>}
      />
    </View>
  );
};
