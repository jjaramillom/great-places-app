import * as Location from 'expo-location';
import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, View, TouchableOpacity } from 'react-native';
import MapView, { Region, MapEvent, Marker, LatLng } from 'react-native-maps';
import { NavigationStackProp, NavigationStackOptions } from 'react-navigation-stack';

import DefaultText from '@app/components/UI/DefaultText';
import { Colors } from '@app/constants';
import { MainRoutes } from '@app/navigation/routes';

interface Props {
  navigation: NavigationStackProp<unknown>;
}

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0922;

const DEFAULT_REGION: LatLng = {
  latitude: 37.7749,
  longitude: -122.4194,
};

const getInitialLocation = async (): Promise<LatLng> => {
  try {
    const initialLocation = await Location.getCurrentPositionAsync();
    return {
      latitude: initialLocation.coords.latitude,
      longitude: initialLocation.coords.longitude,
    };
  } catch (error) {
    return DEFAULT_REGION;
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const MapScreen = ({ navigation }: Props) => {
  const [marker, setMarker] = useState<LatLng | undefined>();
  const [initialRegion, setInitialRegion] = useState<Region | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSelectLocation = (event: MapEvent) => {
    if (!marker) {
      navigation.setParams({ isSaveEnabled: true });
    }
    setMarker(event.nativeEvent.coordinate);
  };

  const saveLocationHandler = useCallback(() => {
    navigation.navigate(MainRoutes.NewPlace, { location: marker });
  }, [marker]);

  const initializeLocation = async () => {
    let initialLocation: LatLng = navigation.getParam('initialLocation');
    if (!initialLocation) {
      setLoading(true);
      initialLocation = await getInitialLocation();
      setLoading(false);
    } else {
      setMarker(initialLocation);
    }
    setInitialRegion({
      ...initialLocation,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
  };

  useEffect(() => {
    initializeLocation();
  }, []);

  useEffect(() => {
    navigation.setParams({ saveLocation: saveLocationHandler });
  }, [saveLocationHandler]);

  return loading ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator color={Colors.primary} size='large' />
    </View>
  ) : (
    <MapView style={styles.map} initialRegion={initialRegion} onPress={handleSelectLocation}>
      {marker && <Marker coordinate={marker} />}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerButton: {
    marginRight: 20,
  },
  headerButtonText: {
    fontSize: 16,
    color: 'white',
  },
  headerButtonDisabled: {
    color: '#ccc',
  },
});

MapScreen.navigationOptions = (navigationData: {
  navigation: NavigationStackProp<unknown>;
}): NavigationStackOptions => {
  const saveLocation = navigationData.navigation.getParam('saveLocation');
  const isSaveEnabled: boolean = navigationData.navigation.getParam('isSaveEnabled');
  return {
    headerTitle: 'Pick location',
    // eslint-disable-next-line react/display-name
    headerRight: () =>
      isSaveEnabled ? (
        <TouchableOpacity style={styles.headerButton} onPress={saveLocation}>
          <DefaultText style={styles.headerButtonText}>Save</DefaultText>
        </TouchableOpacity>
      ) : (
        <View style={styles.headerButton}>
          <DefaultText style={[styles.headerButtonText, styles.headerButtonDisabled]}>
            Save
          </DefaultText>
        </View>
      ),
  };
};

export default MapScreen;
