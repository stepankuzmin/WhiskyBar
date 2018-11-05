// @flow

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  onPress: Function
};

const StartButton = (props: Props) => {
  const { onPress } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.button} onPress={onPress}>
        🥃
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    flex: 1,
    alignSelf: 'center'
  },
  button: {
    fontSize: 48,
    padding: 40
  }
});

export default StartButton;
