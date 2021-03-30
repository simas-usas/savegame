import React from 'react';
import { StyleSheet, View, Dimensions, Modal, Animated, Text, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { PRIMARY_COLOR, FONT_COLOR } from 'styles/colors';

class LogModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      panY: new Animated.Value(Dimensions.get('screen').height),
    };
    this._resetPositionAnim = Animated.timing(this.state.panY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    });
    this._closeAnim = Animated.timing(this.state.panY, {
      toValue: Dimensions.get('screen').height,
      duration: 500,
      useNativeDriver: true,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.visible !== this.props.visible && this.props.visible) {
      this._resetPositionAnim.start();
    }
  }

  _handleDismiss() {
    this._closeAnim.start(() => this.props.onDismiss());
  }

  render() {
    const top = this.state.panY.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [0, 0, 1],
    });
    return (
      <Modal
        animated
        animationType="fade"
        visible={this.props.visible}
        transparent
        onRequestClose={() => this._handleDismiss()}
      >
        <View style={styles.overlay}>
          <Animated.View style={[styles.container, { transform: [{ translateY: top }] }]}>
            <Text style={styles.modalTitle}>LOG</Text>
            <View style={styles.buttonsContainer}>
              <View style={styles.button}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    this._handleDismiss();
                    this.props.updateBacklog(this.props.id);
                  }}
                >
                  <Icon name="clock" size={45} color={FONT_COLOR} solid />
                </TouchableWithoutFeedback>
              </View>
              <View style={styles.button}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    this._handleDismiss();
                    this.props.navigation.navigate('AddReview', {
                      id: this.props.id,
                    });
                  }}
                >
                  <Icon name="pen" size={45} color={FONT_COLOR} solid />
                </TouchableWithoutFeedback>
              </View>
            </View>
          </Animated.View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: PRIMARY_COLOR,
  },
  modalTitle: {
    color: FONT_COLOR,
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
});

const mapDispatchToProps = dispatch => ({
  updateBacklog: id => dispatch({ type: 'UPDATE_BACKLOG', payload: id }),
});

export default connect(null, mapDispatchToProps)(LogModal);
