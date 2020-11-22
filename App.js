import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import GameList from 'containers/GameList/GameList';
import GameProfile from 'containers/GameProfile/GameProfile';
import configureStore from './src/redux/store/index';

const Stack = createStackNavigator();

const theme = {
  colors: {
    background: '#1e293b',
  },
};

const App: () => React$Node = () => {
  return (
    <Provider store={configureStore}>
      <NavigationContainer theme={theme}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="GameList" component={GameList} />
          <Stack.Screen name="GameProfile" component={GameProfile} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
