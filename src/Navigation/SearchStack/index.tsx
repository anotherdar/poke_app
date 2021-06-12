import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DetailScreen } from '../../screen/DetailScreen/index';
import { SinglePokemon } from '../../types/Pokemons';
import { SearchScreen } from '../../screen/searchScreen/index';

export type RootStackParams = {
  home: undefined,
  details: { pokemon: SinglePokemon, color: string }
}

const Stack = createStackNavigator<RootStackParams>();

export const SearchNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: '#fff'
        }
      }}
    >
      <Stack.Screen name="home" component={SearchScreen} />
      <Stack.Screen name="details" component={DetailScreen} />
    </Stack.Navigator>
  );
}