import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Provider } from 'react-redux';

import Navigator from '@app/navigation';
import store from '@app/store/store';
import { init } from '@app/utils/db';

init().catch(console.error);

const fetchFonts = () =>
  Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

const App: React.FC<unknown> = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontsLoaded(true)}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onError={() => {}}
      />
    );
  }

  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
};

export default App;
