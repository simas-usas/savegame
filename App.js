import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import GameList from 'containers/GameList/GameList';
import GameProfile from 'containers/GameProfile/GameProfile';

const Stack = createStackNavigator();

const theme = {
  colors: {
    background: '#1e293b',
  },
};

const App: () => React$Node = () => {
  return (
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
  );
};

export default App;
