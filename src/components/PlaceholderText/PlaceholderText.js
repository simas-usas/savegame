import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';

import { FONT_COLOR } from 'styles/colors';

const { width, height } = Dimensions.get('window');

const PlaceholderText = ({ text }) => (
  <View style={styles.placeholderContainer}>
    <Text style={styles.placeholderText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  placeholderContainer: {
    position: 'absolute',
    marginTop: height * 0.5,
    width,
  },
  placeholderText: {
    textAlign: 'center',
    color: FONT_COLOR,
    fontSize: 18,
  },
});

export default PlaceholderText;