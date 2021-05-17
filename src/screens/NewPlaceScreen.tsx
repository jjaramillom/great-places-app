import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Button } from 'react-native';
import { LatLng } from 'react-native-maps';
import { NavigationStackProp, NavigationStackOptions } from 'react-navigation-stack';

import { Input, ImagePicker, LocationPicker } from '@app/components/UI';
import { Colors } from '@app/constants';
import { useReducer } from '@app/hooks';
import { MainRoutes } from '@app/navigation/routes';
import { addPlace } from '@app/store/places';

interface Props {
  navigation: NavigationStackProp<unknown>;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const NewPlaceScreen = ({ navigation }: Props) => {
  const [title, setTitle] = useState('');
  const [imageUri, setImageUri] = useState<string>('');
  const [location, setLocation] = useState<LatLng | undefined>();
  const { dispatch } = useReducer();

  const newPickedLocation = navigation.getParam('location');

  const handleSavePlace = () => {
    dispatch(
      addPlace({
        place: {
          title,
          imageUri,
          coordinates: location,
        },
      })
    );
    navigation.navigate(MainRoutes.Places);
  };

  useEffect(() => {
    if (newPickedLocation) {
      setLocation(newPickedLocation);
    }
  }, [newPickedLocation]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <Input style={styles.input} label='Title' onChange={setTitle} />
        <ImagePicker onImageTaken={setImageUri} />
        <LocationPicker initialLocation={location} onLocationPicked={setLocation} />
        <Button
          disabled={!title}
          title='save place'
          color={Colors.primary}
          onPress={handleSavePlace}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: { margin: 30 },
  input: {
    marginBottom: 10,
  },
});

const navigationOptions: NavigationStackOptions = {
  headerTitle: 'Add place',
};

NewPlaceScreen.navigationOptions = navigationOptions;

export default NewPlaceScreen;
