import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

import { FONT_COLOR } from '../../styles/colors';

const SearchInput = props => {
  const isFocused = useIsFocused();
  const inputRef = useRef();
  const { setGameSearchInput } = props;

  useEffect(() => {
    if (isFocused) {
      inputRef.current.focus();
    }
  });

  return (
    <View>
      <TextInput
        ref={inputRef}
        onChangeText={e => setGameSearchInput(e)}
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

const mapDispatchToProps = dispatch => ({
  setGameSearchInput: payload => dispatch({ type: 'SET_GAME_SEARCH_INPUT', payload }),
});

export default connect(null, mapDispatchToProps)(SearchInput);
