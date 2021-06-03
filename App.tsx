import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import { AppTabsNavigation } from './src/Navigation/TabNavigation';

export default function App() {
  return (
    <NavigationContainer>
      <AppTabsNavigation />
    </NavigationContainer>
  );
}
