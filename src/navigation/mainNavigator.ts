import {
  createStackNavigator,
  NavigationStackOptions,
  NavigationStackProp,
} from 'react-navigation-stack';

import { MainRoutes } from './routes';
import { Route, defaultStackNavigationOptions } from './shared';
import MapScreen from '@app/screens/MapScreen';
import NewPlaceScreen from '@app/screens/NewPlaceScreen';
import PlaceDetailScreen from '@app/screens/PlaceDetailScreen';
import PlacesListScreen from '@app/screens/PlacesListScreen';

type RoutesMap = {
  [key in MainRoutes]: Route<NavigationStackOptions, NavigationStackProp<unknown>>;
};

const routesMap: RoutesMap = {
  Places: { screen: PlacesListScreen },
  NewPlace: { screen: NewPlaceScreen },
  PlaceDetail: { screen: PlaceDetailScreen },
  MapScreen: { screen: MapScreen },
};

export default createStackNavigator(routesMap, {
  defaultNavigationOptions: defaultStackNavigationOptions,
});
