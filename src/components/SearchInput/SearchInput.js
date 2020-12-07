import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Dimensions, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

import { FONT_COLOR } from '../../styles/colors';

const { width } = Dimensions.get('window');

const SearchInput = () => {
  const isFocused = useIsFocused();
  const inputRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFocused) {
      inputRef.current.focus();
    }
  });

  const onInputChange = (e) => {
    dispatch({ type: 'SET_GAME_SEARCH_INPUT', payload: e });
  };

  return (
    <View>
      <TextInput
        ref={inputRef}
        onChangeText={onInputChange}
        placeholder="Search..."
        placeholderTextColor={FONT_COLOR}
        style={styles.inputStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    color: FONT_COLOR,
    fontSize: 18,
  },
});

export default SearchInput;
