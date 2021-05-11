import { NavigationStackOptions } from 'react-navigation-stack';

import { Colors } from '@app/constants';

export const defaultStackNavigationOptions: NavigationStackOptions = {
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  // headerTitleStyle: {
  //   fontFamily: Fonts.openSansBold,
  // },
  // headerBackTitleStyle: {
  //   fontFamily: Fonts.openSansBold,
  // },
  headerTintColor: 'white',
};

type NavigationOptions<T, S> = T | ((navigationData: { navigation: S }) => T);
export type Route<T, S> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  screen: any;
  navigationOptions?: NavigationOptions<T, S>;
};
