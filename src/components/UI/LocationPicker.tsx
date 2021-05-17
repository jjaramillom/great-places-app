import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { View, Button, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { LatLng } from 'react-native-maps';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';

import DefaultText from '@app/components/UI/DefaultText';
import MapPreview from '@app/components/UI/MapPreview';
import { Colors } from '@app/constants';
import { MainRoutes } from '@app/navigation/routes';

interface Props extends NavigationInjectedProps {
  onLocationPicked: (location: LatLng) => void;
  initialLocation?: LatLng;
}

const hasPermissions = async (): Promise<boolean> => {
  const result = await Location.requestForegroundPermissionsAsync();
  if (!result.granted) {
    Alert.alert(
      'Insufficient permissions!',
      'You need to grant location permissions to use this app',
      [{ text: 'ok' }]
    );
  }
  return result.granted;
};

const LocationPicker: React.FC<Props> = ({
  onLocationPicked,
  initialLocation,
  navigation,
}: Props) => {
  const [pickedLocation, setPickedLocation] = useState<LatLng | undefined>(initialLocation);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const handlePickLocation = async () => {
    if (!(await hasPermissions())) {
      return;
    }
    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync();
      const placeLocation: LatLng = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setPickedLocation(placeLocation);
      onLocationPicked(placeLocation);
    } catch (error) {
      Alert.alert(
        'Could not get current location',
        'Please try again later or pick a location from the map',
        [{ text: 'ok' }]
      );
    }
    setIsFetching(false);
  };

  const handlePickMapLocation = async () => {
    navigation.navigate(MainRoutes.MapScreen, {
      ...(pickedLocation && { initialLocation: pickedLocation }),
    });
  };

  useEffect(() => {
    setPickedLocation(initialLocation);
  }, [initialLocation]);

  return (
    <View style={styles.locationPicker}>
      <MapPreview
        location={pickedLocation}
        style={styles.mapPreview}
        onPress={handlePickMapLocation}>
        {isFetching ? (
          <ActivityIndicator size='large' color={Colors.primary} />
        ) : (
          <DefaultText>No location chosen yet!</DefaultText>
        )}
      </MapPreview>
      <View style={styles.actions}>
        <Button
          title='Get current location'
          color={Colors.primary}
          onPress={handlePickLocation}
        />
        <Button
          title='Pick location on map'
          color={Colors.primary}
          onPress={handlePickMapLocation}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default withNavigation(LocationPicker);
