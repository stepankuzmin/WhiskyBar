// @flow

import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

type Props = {
  duration: number
};

const CardInfo = (props: Props) => {
  const { duration } = props;

  const durationInMinutes = Math.round(duration / 60);
  const info = `~${durationInMinutes} minutes`;

  return (
    <View style={styles.container}>
      <Text style={styles.info}>{info}</Text>
    </View>
  );
};

const textColor = '#fff';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10
  },
  info: {
    fontSize: 16,
    color: textColor,
    textAlign: 'right',
    fontFamily: 'Helvetica'
  }
});

export default CardInfo;
