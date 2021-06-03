import * as React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Text, View, StyleSheet, Dimensions, Image, ActivityIndicator } from 'react-native';
import { RootStackParams } from '../../Navigation/StackNavigation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BackButton } from '../../Components/BackButton';
import { FadeInImage } from '../../Components/FadeInIamge/index';
import { usePokemonDetails } from '../../hooks/usePokemonDetails/index';
import { PokemonDetail } from '../../Components/PokemonDetails';
import { ScrollView } from 'react-native-gesture-handler';

interface RootParams extends RouteProp<RootStackParams, 'details'> { }

const { height: screenHeight } = Dimensions.get('window')

export const DetailScreen = () => {
  const { params } = useRoute<RootParams>();
  const { pokemon, color } = params;
  const { name, id, picture } = pokemon;
  const { top } = useSafeAreaInsets()
  const { pokemonDetail, isLoading } = usePokemonDetails(id)

  return (
    <ScrollView 
      style={{
        ...StyleSheet.absoluteFillObject,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View style={DetailsStyles.container}>
        <View style={[DetailsStyles.headerContainer, { backgroundColor: color, height: screenHeight * 0.4 }]}>
          {/* back */}
          <BackButton />

          {/* name */}
          <Text style={[DetailsStyles.pkName, { top: top + 60 }]}>{name + '\n#'} {id}</Text>


          {/* pk ball */}
          <Image
            source={require('../../assets/pokebola-blanca.png')}
            style={DetailsStyles.pkBall}
          />
          {/* cover img */}
          <FadeInImage
            uri={picture}
            style={DetailsStyles.pkCoverImage}
          />
        </View>

        {/* body */}
        {isLoading ? (
          <View style={{ 
            height: screenHeight * .6,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: -1,
          }}>
            <ActivityIndicator color={color} size={45} style={{ height: 100 }} />
          </View>
        ) : <PokemonDetail pokemon={pokemonDetail} color={color} />}
      </View>
    </ScrollView>
  );
};


const DetailsStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    alignItems: 'center',
    borderBottomLeftRadius: 300,
    borderBottomRightRadius: 300
  },
  pkName: {
    color: '#fff',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 20,
    textTransform: 'capitalize'
  },
  pkCoverImage: {
    width: 250,
    height: 250
  },
  pkBall: {
    position: 'absolute',
    height: 300,
    width: 300,
    opacity: 0.5,
  },
  pkLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red'
  }
})