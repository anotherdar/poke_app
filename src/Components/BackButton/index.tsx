import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet } from 'react-native';
import { Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export const BackButton = () => {
  const navigator = useNavigation();
  const { top } = useSafeAreaInsets();

  return (
    <Pressable
      style={[backButtonStyles.backButton, { top: top + 20 }]}
      onPress={() => navigator.goBack()}
    >
      <Icon name='arrow-back-outline' color='#fff' size={36} />
    </Pressable>
  )
}

const backButtonStyles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    left: 20
  }
})