import React from 'react';
import { View } from 'react-native';
import { NavigationStackProp, NavigationStackOptions } from 'react-navigation-stack';

import { DefaultText } from '@app/components/UI';

interface Props {
  navigation: NavigationStackProp<unknown>;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const PlaceDetailScreen = ({ navigation }: Props) => {
  return (
    <View>
      <DefaultText>detail</DefaultText>
    </View>
  );
};

PlaceDetailScreen.navigationOptions = (navigationData: {
  navigation: NavigationStackProp<unknown>;
}): NavigationStackOptions => {
  const title = navigationData.navigation.getParam('title');
  return {
    headerTitle: title,
  };
};

export default PlaceDetailScreen;
