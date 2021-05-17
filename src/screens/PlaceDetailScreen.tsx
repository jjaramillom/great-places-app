import React from 'react';
import { View, ScrollView, Image, StyleSheet } from 'react-native';
import { NavigationStackProp, NavigationStackOptions } from 'react-navigation-stack';

import { DefaultText, MapPreview } from '@app/components/UI';
import { Colors } from '@app/constants';
import { useReducer } from '@app/hooks';
import { MainRoutes } from '@app/navigation/routes';

interface Props {
  navigation: NavigationStackProp<unknown>;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const PlaceDetailScreen = ({ navigation }: Props) => {
  const { selector } = useReducer();
  const placeId = navigation.getParam('id');

  const place = selector((state) => state.places.places.find((p) => p.id === placeId));

  const handleMapPress = () => {
    navigation.navigate(MainRoutes.MapScreen, {
      initialLocation: place?.coordinates,
      viewOnly: true,
      title: `${place?.title} location`,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri:
            place?.imageUri && place?.imageUri !== ''
              ? place.imageUri
              : 'https://image.arrivalguides.com/415x300/03/3a44251a00b228e2467d2f82582365bf.jpg',
        }}
      />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <DefaultText style={styles.address}>{place?.address}</DefaultText>
        </View>
        <MapPreview
          onPress={handleMapPress}
          style={styles.mapPreview}
          location={place?.coordinates}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
    backgroundColor: '#ccc',
  },
  locationContainer: {
    marginVertical: 20,
    width: '90%',
    maxWidth: 350,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary,
    textAlign: 'center',
  },
  mapPreview: {
    width: '100%',
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

PlaceDetailScreen.navigationOptions = (navigationData: {
  navigation: NavigationStackProp<unknown>;
}): NavigationStackOptions => {
  const title = navigationData.navigation.getParam('title');
  return {
    headerTitle: title,
  };
};

export default PlaceDetailScreen;
