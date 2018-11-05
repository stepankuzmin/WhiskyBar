// @flow

import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

type Props = {
  name: string,
  location: {
    address: string
  },
  onPress: Function
};

const CardTitle = (props: Props) => {
  const {
    name,
    location: { address },
    onPress
  } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.button} onPress={onPress}>
        🥃
      </Text>
      <Text style={styles.title} numberOfLines={2}>
        {name}
      </Text>
      <Text style={styles.subtitle}>{address}</Text>
    </View>
  );
};

const fontFamily = 'Cochin';
const textColor = '#fff';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  title: {
    flex: 1,
    marginLeft: 58,
    color: textColor,
    textAlign: 'right',
    fontSize: 26,
    fontFamily
  },
  subtitle: {
    color: textColor,
    textAlign: 'right',
    fontStyle: 'italic',
    fontWeight: '300',
    fontSize: 20,
    fontFamily
  },
  button: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2,
    fontSize: 48
  }
});

export default CardTitle;
