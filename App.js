import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { HeaderBackButton } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome5';

import GameList from 'containers/GameList/GameList';
import GameProfile from 'containers/GameProfile/GameProfile';
import GameSearch from 'containers/GameSearch/GameSearch';
import AddReview from 'containers/AddReview/AddReview';
import SearchInput from 'components/SearchInput/SearchInput';
import { navigationRef, navigate, goBack } from 'components/RootNavigation/RootNavigation';
import configureStore from './src/redux/store/index';
import { FONT_COLOR, PRIMARY_COLOR, SECONDARY_COLOR } from './src/styles/colors';

const Drawer = createDrawerNavigator();

const theme = {
  colors: {
    background: SECONDARY_COLOR,
  },
};

const App: () => React$Node = () => {
  return (
    <Provider store={configureStore}>
      <NavigationContainer theme={theme} ref={navigationRef}>
        <Drawer.Navigator
          drawerContent={props => (
            <DrawerContentScrollView {...props}>
              <DrawerItem
                label="Home"
                focused={props.state.index === 0}
                onPress={() => navigate('GameList')}
                activeTintColor={FONT_COLOR}
                activeBackgroundColor={PRIMARY_COLOR}
                inactiveTintColor={FONT_COLOR}
                style={styles.drawerItem}
              />
            </DrawerContentScrollView>
          )}
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
              headerRight: () => (
                <TouchableWithoutFeedback onPress={() => navigate('GameSearch')}>
                  <Icon name="search" size={20} color={FONT_COLOR} style={styles.searchIcon} />
                </TouchableWithoutFeedback>
              ),
            }}
          />
          <Drawer.Screen name="GameProfile" component={GameProfile} options={{ headerShown: false }} />
          <Drawer.Screen
            name="GameSearch"
            component={GameSearch}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: PRIMARY_COLOR,
              },
              headerTintColor: FONT_COLOR,
              headerTitle: <SearchInput />,
              headerLeft: props => <HeaderBackButton {...props} onPress={() => goBack()} />,
            }}
          />
          <Drawer.Screen
            name="AddReview"
            component={AddReview}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: PRIMARY_COLOR,
              },
              headerTintColor: FONT_COLOR,
              headerTitle: 'Add Review',
              headerLeft: props => <HeaderBackButton {...props} onPress={() => goBack()} />,
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  searchIcon: {
    marginRight: 20,
  },
  drawerItem: {
    borderRadius: 0,
    marginHorizontal: 0,
  },
});

export default App;
