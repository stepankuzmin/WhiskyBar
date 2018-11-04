// @flow

import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';

import Map from './Map';
import Button from './RouteButton';
import { fetchVenues, fetchDirections } from './utils';

type Props = {};
class App extends PureComponent<Props> {
  state = {
    origin: {
      latitude: 0.0,
      longitude: 0.0
    },
    destination: {
      latitude: 0.0,
      longitude: 0.0
    },
    venues: null,
    venueIndex: null,
    directions: null
  };

  onUserLocationUpdate = location => {
    const { coords } = location;
    this.setState({ origin: { ...coords } });
  };

  showNextBar = async () => {
    let venues;
    let venueIndex;
    const { origin } = this.state;
    if (!this.state.venues) {
      venues = await fetchVenues(origin);
      venueIndex = 0;
    } else {
      venues = this.state.venues;
      venueIndex =
        this.state.venueIndex >= venues.length - 1
          ? 0
          : this.state.venueIndex + 1;
    }

    const venue = venues[venueIndex];
    const destination = {
      latitude: venue.location.lat,
      longitude: venue.location.lng
    };

    const directions = await fetchDirections(origin, destination);

    this.setState({
      destination,
      venues,
      venueIndex,
      directions
    });
  };

  render() {
    const { directions, destination } = this.state;
    const route = directions && directions.routes[0];

    return (
      <View style={styles.container}>
        <Map
          route={route}
          destination={destination}
          onUserLocationUpdate={this.onUserLocationUpdate}
        />
        <Button onPress={this.showNextBar} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default App;
