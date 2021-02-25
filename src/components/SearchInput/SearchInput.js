import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

import { FONT_COLOR } from 'styles/colors';

const SearchInput = ({ setGameSearchInput, searchInput }) => {
  const isFocused = useIsFocused();
  const inputRef = useRef();

  useEffect(() => {
    if (isFocused) {
      inputRef.current.focus();
    } else {
      setGameSearchInput('');
    }
  });

  return (
    <View>
      <TextInput
        ref={inputRef}
        value={searchInput}
        onChangeText={e => setGameSearchInput(e)}
        placeholder="Search..."
        placeholderTextColor={FONT_COLOR}
        style={styles.searchInput}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    color: FONT_COLOR,
    fontSize: 18,
  },
});

const mapStateToProps = ({ session: { searchInput } }) => ({
  searchInput,
});

const mapDispatchToProps = dispatch => ({
  setGameSearchInput: payload => dispatch({ type: 'SET_GAME_SEARCH_INPUT', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);
