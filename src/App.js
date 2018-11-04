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
    venueIndex: -1,
    directions: null
  };

  onUserLocationUpdate = location => {
    const { coords } = location;
    this.setState({ origin: { ...coords } });
  };

  showNextBar = async () => {
    const { origin } = this.state;
    if (!this.state.venues) {
      const venues = await fetchVenues(origin);
      await new Promise(resolve => this.setState({ venues }, resolve));
    }

    const { venues, venueIndex } = this.state;
    const nextVenueIndex = venueIndex >= venues.length - 1 ? 0 : venueIndex + 1;

    const venue = venues[nextVenueIndex];
    const destination = {
      latitude: venue.location.lat,
      longitude: venue.location.lng
    };

    const directions = await fetchDirections(origin, destination);

    this.setState({
      destination,
      directions,
      venues,
      venueIndex: nextVenueIndex
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
