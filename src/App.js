// @flow

import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';

import Map from './Map';
import Card from './Card';
import StartButton from './StartButton';
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
    route: null
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
    const route = directions.routes[0];

    const coordinates = route.geometry.coordinates;
    coordinates.unshift([origin.longitude, origin.latitude]);
    coordinates.push([destination.longitude, destination.latitude]);

    this.setState({
      destination,
      route,
      venues,
      venueIndex: nextVenueIndex
    });
  };

  render() {
    const { venues, venueIndex, route, destination } = this.state;
    const venue = venues && venues[venueIndex];

    return (
      <View style={styles.container}>
        <Map
          route={route}
          destination={destination}
          onUserLocationUpdate={this.onUserLocationUpdate}
        />
        <Card venue={venue} route={route} onPress={this.showNextBar} />
        {!venue && <StartButton onPress={this.showNextBar} />}
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
