import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import { AppTabsNavigation } from './src/Navigation/TabNavigation';
import { StatusBar } from 'react-native';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar 
        translucent={true}
      />
      <AppTabsNavigation />
    </NavigationContainer>
  );
}
