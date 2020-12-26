import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

const { width, height } = Dimensions.get('window');

import { PRIMARY_COLOR, FONT_COLOR, ICON_COLOR } from '../../styles/colors';

const AddReview = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const id = route.params.id;
  const reviewText = useSelector((state) => state.session.addReviewInput);

  const onInputChange = (event) => {
    dispatch({ type: 'SET_ADD_REVIEW_INPUT', payload: event });
  };

  const onSubmit = () => {
    dispatch({ type: 'SET_GAME_REVIEW', payload: { id, reviewText } });
    dispatch({ type: 'SET_ADD_REVIEW_INPUT', payload: null });
    navigation.goBack();
  };

  return (
    <View style={styles.addReviewContainer}>
      <TextInput
        value={reviewText}
        onChangeText={onInputChange}
        style={styles.textInput}
        placeholder="Add review..."
        placeholderTextColor={PRIMARY_COLOR}
        multiline
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          disabled={!reviewText}
          onPress={() => onSubmit()}
          style={reviewText ? styles.submitButton : styles.disabledSubmitButton}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const submitButtonStyle = {
  flex: 1,
  backgroundColor: ICON_COLOR,
  alignItems: 'center',
  justifyContent: 'center',
  width,
  height: height * 0.075,
};

const styles = StyleSheet.create({
  addReviewContainer: {
    flex: 1,
    alignItems: 'center',
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: 0,
  },
  textInput: {
    width: width * 0.95,
    fontSize: 18,
    color: FONT_COLOR,
  },
  submitButton: {
    ...submitButtonStyle,
  },
  disabledSubmitButton: {
    ...submitButtonStyle,
    opacity: 0.8,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});

export default AddReview;
