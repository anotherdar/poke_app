import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../../screen/HomeScreen/index';
import { DetailScreen } from '../../screen/DetailScreen/index';
import { SinglePokemon } from '../../types/Pokemons';

export type RootStackParams = {
  home: undefined,
  details: { pokemon: SinglePokemon, color: string }
}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: '#fff'
        }
      }}
    >
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="details" component={DetailScreen} />
    </Stack.Navigator>
  );
}