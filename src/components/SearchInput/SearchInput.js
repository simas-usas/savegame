import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

import { FONT_COLOR } from '../../styles/colors';

const SearchInput = () => {
  const isFocused = useIsFocused();
  const inputRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFocused) {
      inputRef.current.focus();
    }
  });

  const onInputChange = event => {
    dispatch({ type: 'SET_GAME_SEARCH_INPUT', payload: event });
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
