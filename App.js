import React, { useEffect } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HeaderBackButton } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SplashScreen from 'react-native-splash-screen';

import Home from 'containers/Home/Home';
import GameProfile from 'containers/GameProfile/GameProfile';
import GameSearch from 'containers/GameSearch/GameSearch';
import AddReview from 'containers/AddReview/AddReview';
import UserLists from 'containers/UserLists/UserLists';
import Backlog from 'containers/Backlog/Backlog';
import UserProfile from 'containers/UserProfile/UserProfile';

import SearchInput from 'components/SearchInput/SearchInput';
import SideNavigation from 'components/SideNavigation/SideNavigation';
import { navigationRef, navigate, goBack, getRouteParams } from 'components/RootNavigation/RootNavigation';
import { FONT_COLOR, PRIMARY_COLOR, SECONDARY_COLOR } from 'styles/colors';
import configureStore from './src/redux/store/index';
import AddList from './src/containers/AddList/AddList';

const Drawer = createDrawerNavigator();

const theme = {
  colors: {
    background: SECONDARY_COLOR,
  },
};

const App: () => React$Node = () => {
  useEffect(() => {
    SplashScreen.hide();
  });
  return (
    <Provider store={configureStore}>
      <NavigationContainer theme={theme} ref={navigationRef}>
        <Drawer.Navigator
          drawerContent={props => <SideNavigation {...props} />}
          drawerStyle={{
            backgroundColor: SECONDARY_COLOR,
          }}
        >
          <Drawer.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: true,
              headerTintColor: FONT_COLOR,
              headerTitle: 'Home',
              headerStyle: {
                backgroundColor: PRIMARY_COLOR,
              },
              headerRight: () => (
                <TouchableWithoutFeedback
                  onPress={() =>
                    navigate('GameSearch', {
                      onPress: id => navigate('GameProfile', { id }),
                    })
                  }
                >
                  <Icon name="search" size={20} color={FONT_COLOR} style={styles.headerRightIcon} />
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
          <Drawer.Screen
            name="UserLists"
            component={UserLists}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: PRIMARY_COLOR,
              },
              headerTintColor: FONT_COLOR,
              headerTitle: 'Your Lists',
              headerLeft: props => <HeaderBackButton {...props} onPress={() => goBack()} />,
            }}
          />
          <Drawer.Screen
            name="AddList"
            component={AddList}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: PRIMARY_COLOR,
              },
              headerTintColor: FONT_COLOR,
              headerTitle: 'Create List',
              headerLeft: props => <HeaderBackButton {...props} onPress={() => goBack()} />,
              headerRight: () => (
                <TouchableWithoutFeedback
                  onPress={() => {
                    getRouteParams('AddList').onSubmit();
                    goBack();
                  }}
                >
                  <Icon name="check" size={20} color={FONT_COLOR} style={styles.headerRightIcon} />
                </TouchableWithoutFeedback>
              ),
            }}
          />
          <Drawer.Screen
            name="Backlog"
            component={Backlog}
            options={{
              headerShown: true,
              headerTintColor: FONT_COLOR,
              headerTitle: 'Backlog',
              headerStyle: {
                backgroundColor: PRIMARY_COLOR,
              },
            }}
          />
          <Drawer.Screen
            name="UserProfile"
            component={UserProfile}
            options={{
              headerShown: true,
              headerTintColor: FONT_COLOR,
              headerTitle: 'Profile',
              headerStyle: {
                backgroundColor: PRIMARY_COLOR,
              },
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  headerRightIcon: {
    marginRight: 20,
  },
  drawerItem: {
    borderRadius: 0,
    marginHorizontal: 0,
  },
});

export default App;
