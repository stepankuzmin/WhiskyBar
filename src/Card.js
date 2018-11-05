// @flow

import React from 'react';
import { StyleSheet, View } from 'react-native';

import CardTitle from './CardTitle';
import CardInfo from './CardInfo';

type Props = {
  venue?: {
    name: string,
    location: {
      address: string
    }
  },
  route?: {
    distance: number,
    duration: number
  },
  onPress: Function
};

const Card = (props: Props) => {
  const { venue, route, onPress } = props;

  if (!venue || !route) {
    return null;
  }

  return (
    <View style={styles.container}>
      <CardTitle
        name={venue.name}
        distance={route.distance}
        location={venue.location}
        onPress={onPress}
      />
      <CardInfo {...route} />
    </View>
  );
};

Card.defaultProps = {
  venue: null,
  route: null
};

const shadowColor = '#000';
const backgroundColor = '#343332';
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor,

    // shadow
    shadowColor,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6
  }
});

export default Card;
