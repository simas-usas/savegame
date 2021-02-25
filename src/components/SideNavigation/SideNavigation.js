import React from 'react';
import { StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { navigate } from 'components/RootNavigation/RootNavigation';
import { FONT_COLOR, PRIMARY_COLOR, SECONDARY_COLOR } from 'styles/colors';

const SideNavigation = props => (
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
    <DrawerItem
      label="Lists"
      focused={props.state.index === 1}
      onPress={() => navigate('UserLists')}
      activeTintColor={FONT_COLOR}
      activeBackgroundColor={PRIMARY_COLOR}
      inactiveTintColor={FONT_COLOR}
      inactiveBackgroundColor={SECONDARY_COLOR}
      style={styles.drawerItem}
    />
  </DrawerContentScrollView>
);

const styles = StyleSheet.create({
  drawerItem: {
    borderRadius: 0,
    marginHorizontal: 0,
  },
});

export default SideNavigation;
