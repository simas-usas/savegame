import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import GameList from 'containers/GameList/GameList';
import GameProfile from 'containers/GameProfile/GameProfile';
import configureStore from './src/redux/store/index';
import {
  FONT_COLOR,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
} from './src/styles/colors';

const Drawer = createDrawerNavigator();

const theme = {
  colors: {
    background: SECONDARY_COLOR,
  },
};

const App: () => React$Node = () => {
  return (
    <Provider store={configureStore}>
      <NavigationContainer theme={theme}>
        <Drawer.Navigator
          drawerContentOptions={{
            activeTintColor: FONT_COLOR,
            activeBackgroundColor: PRIMARY_COLOR,
            inactiveTintColor: FONT_COLOR,
          }}
          drawerStyle={{
            backgroundColor: SECONDARY_COLOR,
          }}
        >
          <Drawer.Screen
            name="GameList"
            component={GameList}
            options={{
              headerShown: true,
              headerTintColor: FONT_COLOR,
              headerTitle: 'Home',
              headerStyle: {
                backgroundColor: PRIMARY_COLOR,
              },
            }}
          />
          <Drawer.Screen
            name="GameProfile"
            component={GameProfile}
            options={{ headerShown: false }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
