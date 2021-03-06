import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { navigate } from 'components/RootNavigation/RootNavigation';
import { FONT_COLOR, PRIMARY_COLOR, SECONDARY_COLOR } from 'styles/colors';

import { user as userData } from '../../data';

const { width } = Dimensions.get('window');

const SideNavigation = props => (
  <DrawerContentScrollView {...props}>
    <View style={styles.userContainer}>
      <View style={styles.userAvatarContainer}>
        <Image source={userData.avatar} style={styles.userAvatar} />
      </View>
      <View style={styles.userNameContainer}>
        <Text style={styles.userName}>{userData.name}</Text>
      </View>
    </View>
    <DrawerItem
      label="Home"
      icon={() => <Icon color={FONT_COLOR} size={18} name="home" />}
      focused={props.state.index === 0}
      onPress={() => navigate('Home')}
      activeTintColor={FONT_COLOR}
      activeBackgroundColor={PRIMARY_COLOR}
      inactiveTintColor={FONT_COLOR}
      style={styles.drawerItem}
    />
    <DrawerItem
      label="Profile"
      icon={() => <Icon color={FONT_COLOR} size={18} name="user" />}
      focused={props.state.index === 7}
      onPress={() => navigate('UserProfile')}
      activeTintColor={FONT_COLOR}
      activeBackgroundColor={PRIMARY_COLOR}
      inactiveTintColor={FONT_COLOR}
      inactiveBackgroundColor={SECONDARY_COLOR}
      style={styles.drawerItem}
    />
    <DrawerItem
      label="Backlog"
      icon={() => <Icon color={FONT_COLOR} size={18} name="clock" />}
      focused={props.state.index === 6}
      onPress={() => navigate('Backlog')}
      activeTintColor={FONT_COLOR}
      activeBackgroundColor={PRIMARY_COLOR}
      inactiveTintColor={FONT_COLOR}
      inactiveBackgroundColor={SECONDARY_COLOR}
      style={styles.drawerItem}
    />
    <DrawerItem
      label="Lists"
      icon={() => <Icon color={FONT_COLOR} size={18} name="list" />}
      focused={props.state.index === 4}
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
  userContainer: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 8,
  },
  userAvatarContainer: {
    width: width * 0.1375,
    height: width * 0.1375,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    borderRadius: width / 2,
    marginVertical: 7.5,
  },
  userAvatar: {
    flex: 1,
    height: undefined,
    width: undefined,
    resizeMode: 'contain',
    borderRadius: width / 2,
  },
  userNameContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  userName: {
    marginLeft: 16,
    color: FONT_COLOR,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SideNavigation;
