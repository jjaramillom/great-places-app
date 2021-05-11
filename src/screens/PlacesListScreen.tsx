import React from 'react';
import { FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { NavigationStackProp, NavigationStackOptions } from 'react-navigation-stack';

import PlaceItem from '@app/components/PlaceItem';
import { HeaderButton } from '@app/components/UI';
import { useReducer } from '@app/hooks';
import Place from '@app/models/Place';
import { MainRoutes } from '@app/navigation/routes';

interface Props {
  navigation: NavigationStackProp<unknown>;
}

const renderPlace = (place: Place, onSelect: (id: string, title: string) => void) => (
  <PlaceItem place={place} onSelect={() => onSelect(place.id, place.title)} />
);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const PlacesListScreen = ({ navigation }: Props) => {
  const { selector } = useReducer();
  const { places } = selector((state) => state.places);

  const handleSelection = (id: string, title: string) => {
    navigation.navigate(MainRoutes.PlaceDetail, { id, title });
  };
  return (
    <FlatList
      data={places}
      renderItem={(data) => renderPlace(data.item, handleSelection)}
      keyExtractor={(item) => item.id}
    />
  );
};

PlacesListScreen.navigationOptions = (navigationData: {
  navigation: NavigationStackProp<unknown>;
}): NavigationStackOptions => {
  return {
    headerTitle: 'All places',

    // eslint-disable-next-line react/display-name
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Menu'
          iconName='md-add'
          onPress={() => {
            navigationData.navigation.navigate(MainRoutes.NewPlace);
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default PlacesListScreen;
