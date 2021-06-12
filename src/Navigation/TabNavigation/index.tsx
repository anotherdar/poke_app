import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackNavigation } from '../StackNavigation/index';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

import { SearchScreen } from '../../screen/searchScreen/index';
import { SearchNavigation } from '../SearchStack/index';

const Tab = createBottomTabNavigator();


export const AppTabsNavigation = () => {
    return (
        <Tab.Navigator
            sceneContainerStyle={{
                backgroundColor: '#fff'
            }}
            tabBarOptions={{
                activeTintColor: '#ffaa00',
                labelStyle: {
                    marginBottom: Platform.OS === 'ios' ? 0 : 10
                },
                style: {
                    borderWidth: 0,
                    elevation: 0,
                    height: 65,
                    position: 'absolute',
                    backgroundColor: 'rgba(255,255,255,0.8)',
                }
            }}
        >
            <Tab.Screen
                name="list"
                component={StackNavigation}
                options={{
                    tabBarLabel: 'Pokemons',
                    tabBarIcon: ({ color }) => {
                        return <Icon color={color} size={24} name='flash-outline'/>
                    }
                }}
            />
            <Tab.Screen
                name="search"
                component={SearchNavigation}
                options={{
                    tabBarLabel: 'Search',
                    tabBarIcon: ({ color }) => {
                        return <Icon color={color} size={24} name='search-outline'/>
                    }
                }}
            />
        </Tab.Navigator>
    );
}