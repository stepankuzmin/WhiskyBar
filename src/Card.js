// @flow

import React, { PureComponent } from 'react';
import { Animated, Text, StyleSheet } from 'react-native';

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
  }
};

class Card extends PureComponent<Props> {
  state = {
    position: new Animated.Value(-100)
  };

  componentDidMount() {
    Animated.timing(this.state.position, {
      toValue: 0,
      duration: 600
    }).start();
  }

  render() {
    const { venue, route } = this.props;

    if (!venue || !route) {
      return null;
    }

    let { position } = this.state;
    const containerStyle = { ...styles.container, bottom: position };

    const { name, location } = venue;
    const subtitle = location.address || `${Math.round(route.distance)} meters`;
    const duration = Math.round(route.duration / 60);
    const durationInMinutes = `~${duration} minutes`;

    return (
      <Animated.View style={containerStyle}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Text style={styles.duration}>{durationInMinutes}</Text>
      </Animated.View>
    );
  }
}

Card.defaultProps = {
  venue: null,
  route: null
};

const backgroundColor = '#222';
const shadowColor = '#000';

const marginLeft = 58;
const fontFamily = 'Cochin';
const titleColor = '#BF8F60';
const whiteCream = '#F7F3EE';

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
    shadowColor,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6
  },
  title: {
    flex: 1,
    color: titleColor,
    textAlign: 'right',
    fontSize: 26,
    fontFamily,
    marginLeft
  },
  subtitle: {
    color: whiteCream,
    textAlign: 'right',
    fontStyle: 'italic',
    fontWeight: '300',
    fontSize: 20,
    fontFamily,
    marginLeft
  },
  duration: {
    fontSize: 16,
    paddingTop: 16,
    color: whiteCream,
    textAlign: 'right',
    fontFamily: 'Helvetica',
    marginLeft
  }
});

export default Card;
