// @flow

import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import mapboxDirections from '@mapbox/mapbox-sdk/services/directions';

import Map from './Map';
import Button from './RouteButton';
import { MAPBOX_ACCESS_TOKEN, FOURSQUARE_API_URL } from './config';

MapboxGL.setAccessToken(MAPBOX_ACCESS_TOKEN);
const directionsClient = mapboxDirections({ accessToken: MAPBOX_ACCESS_TOKEN });

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
    directions: null,
    venueIndex: null
  };

  onUserLocationUpdate = location => {
    const { coords } = location;
    this.setState({ origin: { ...coords } });
  };

  showNextBar = async () => {
    let venues;
    let venueIndex;
    if (!this.state.venues) {
      venues = await this.fetchVenues();
      venueIndex = 0;
    } else {
      venues = this.state.venues;
      venueIndex =
        this.state.venueIndex >= venues.length - 1
          ? 0
          : this.state.venueIndex + 1;
    }

    const venue = venues[venueIndex];

    const { lat, lng } = venue.location;
    const to = [lng, lat];

    const directions = await this.fetchDirections(to);

    this.setState({
      destination: {
        latitude: lat,
        longitude: lng
      },
      venues,
      venueIndex,
      directions
    });
  };

  fetchVenues = () => {
    const {
      origin: { latitude, longitude }
    } = this.state;

    const apiUrl = `${FOURSQUARE_API_URL}&ll=${latitude},${longitude}`;

    return fetch(apiUrl)
      .then(response => response.json())
      .then(({ response }) => response.venues);
  };

  fetchDirections = to => {
    const {
      origin: { latitude, longitude }
    } = this.state;

    const from = [longitude, latitude];

    return directionsClient
      .getDirections({
        profile: 'walking',
        geometries: 'geojson',
        waypoints: [{ coordinates: from }, { coordinates: to }]
      })
      .send()
      .then(response => response.body);
  };

  render() {
    const { directions, destination } = this.state;
    const route = directions && directions.routes[0];

    return (
      <View style={styles.container}>
        <Map
          route={route}
          destination={destination}
          accessToken={MAPBOX_ACCESS_TOKEN}
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
