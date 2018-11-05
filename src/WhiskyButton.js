// @flow

import React, { PureComponent } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';

type Props = {
  onPress: Function
};

class WhiskyButton extends PureComponent<Props> {
  state = {
    position: new Animated.Value(-100)
  };

  componentDidMount() {
    Animated.timing(this.state.position, {
      toValue: 0,
      duration: 800
    }).start();
  }

  render() {
    const { onPress } = this.props;

    let { position } = this.state;
    const containerStyle = { ...styles.container, bottom: position };

    return (
      <Animated.View style={containerStyle}>
        <Text style={styles.button} onPress={onPress}>
          🥃
        </Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    flex: 1,
    alignSelf: 'flex-start'
  },
  button: {
    fontSize: 48,
    padding: 20
  }
});

export default WhiskyButton;
