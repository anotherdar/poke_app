import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import { StackNavigation } from './src/Navigation/StackNavigation';

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigation/>
    </NavigationContainer>
  );
}
