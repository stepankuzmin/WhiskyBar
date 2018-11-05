// @flow

import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

type Props = {
  name?: string,
  onPress: Function
};

const Card = (props: Props) => {
  const { name, onPress } = props;

  return (
    <View style={styles.container}>
      <Text
        style={[styles.title, !name && styles.emptyTitle]}
        numberOfLines={1}
      >
        {name || 'click here →'}
      </Text>
      <Text style={styles.button} onPress={onPress}>
        🥃
      </Text>
    </View>
  );
};

Card.defaultProps = {
  name: null
};

const fontSize = 36;
const titleColor = '#fff';
const emptyTitleColor = '#ddd';
const containerBackgroundColor = '#696969';
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    fontSize: 36,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: containerBackgroundColor
  },
  title: {
    flex: 1,
    paddingRight: 10,
    color: titleColor,
    fontSize
  },
  emptyTitle: {
    color: emptyTitleColor,
    textAlign: 'right'
  },
  button: {
    fontSize
  }
});

export default Card;
