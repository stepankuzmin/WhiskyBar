// @flow

import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

type Props = {
  onPress: Function
};

const RouteButton = (props: Props) => {
  const { onPress } = props;

  return (
    <View style={styles.container}>
      <Button
        onPress={onPress}
        title='Well, show me the way to the next whisky bar'
        color='#000'
      />
    </View>
  );
};

const backgroundColor = '#fff';
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 40,
    width: 240,
    flex: 1,
    justifyContent: 'center',
    borderRadius: 20,
    padding: 10,
    backgroundColor
  }
});

export default RouteButton;
