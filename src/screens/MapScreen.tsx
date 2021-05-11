import React from 'react';
import { View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { NavigationStackProp, NavigationStackOptions } from 'react-navigation-stack';

import { DefaultText, HeaderButton } from '@app/components/UI';

interface Props {
  navigation: NavigationStackProp<unknown>;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const MapScreen = ({ navigation }: Props) => {
  return (
    <View>
      <DefaultText>mapscreen</DefaultText>
    </View>
  );
};

MapScreen.navigationOptions = (navigationData: {
  navigation: NavigationStackProp<unknown>;
}): NavigationStackOptions => {
  return {
    headerTitle: 'All places',

    // eslint-disable-next-line react/display-name
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title='Menu' iconName='md-add' />
      </HeaderButtons>
    ),
  };
};

export default MapScreen;
