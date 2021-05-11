import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Button } from 'react-native';
import { NavigationStackProp, NavigationStackOptions } from 'react-navigation-stack';

import { Input } from '@app/components/UI';
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
  const { dispatch } = useReducer();
  console.log(title);

  const handleSavePlace = () => {
    dispatch(addPlace({ place: { title } }));
    navigation.navigate(MainRoutes.Places);
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Input style={styles.input} label='Title' onChange={setTitle} />
        <Button title='save place' color={Colors.primary} onPress={handleSavePlace} />
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
