import * as Location from 'expo-location';
import React, { useState } from 'react';
import { View, Button, ActivityIndicator, Alert, StyleSheet } from 'react-native';

import { DefaultText, MapPreview } from '@app/components/UI';
import { Colors } from '@app/constants';

interface Props {
  onLocationReady: (location: PlaceLocation) => void;
}

export interface PlaceLocation {
  latitude: number;
  longitude: number;
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

const LocationPicker: React.FC<Props> = ({ onLocationReady }: Props) => {
  const [pickedLocation, setPickedLocation] = useState<PlaceLocation | undefined>();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const handlePickLocation = async () => {
    if (!(await hasPermissions())) {
      return;
    }
    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync();
      const placeLocation: PlaceLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setPickedLocation(placeLocation);
      onLocationReady(placeLocation);
    } catch (error) {
      Alert.alert(
        'Could not get current location',
        'Please try again later or pick a location from the map',
        [{ text: 'ok' }]
      );
    }
    setIsFetching(false);
  };
  return (
    <View style={styles.locationPicker}>
      <MapPreview location={pickedLocation} style={styles.mapPreview}>
        {isFetching ? (
          <ActivityIndicator size='large' color={Colors.primary} />
        ) : (
          <DefaultText>No location chosen yet!</DefaultText>
        )}
      </MapPreview>
      <Button
        title='Get current location'
        color={Colors.primary}
        onPress={handlePickLocation}
      />
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
});

export default LocationPicker;
