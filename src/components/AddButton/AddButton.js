import React from 'react';
import { StyleSheet, View, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { ICON_COLOR } from 'styles/colors';

const { width } = Dimensions.get('window');

const AddButton = ({ onPress }) => (
  <View style={styles.addButton}>
    <TouchableWithoutFeedback onPress={onPress}>
      <Icon name="plus-circle" size={45} color={ICON_COLOR} solid />
    </TouchableWithoutFeedback>
  </View>
);

const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    display: 'flex',
    alignItems: 'flex-end',
    marginRight: width * 0.05,
    marginBottom: width * 0.05,
  },
});

export default AddButton;
