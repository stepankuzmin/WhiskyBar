// @flow

import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import mapboxDirections from '@mapbox/mapbox-sdk/services/directions';

import Map from './Map';
import Route from './Route';
import Destination from './Destination';
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
    directions: null
  };

  onUserLocationUpdate = location => {
    const { coords } = location;
    this.setState({ origin: { ...coords } });
  };

  showNextBar = async () => {
    const {
      origin: { latitude, longitude }
    } = this.state;

    const venues = await this.fetchVenues(latitude, longitude);

    const { lat, lng } = venues[0].location;
    const from = [longitude, latitude];
    const to = [lng, lat];

    const directions = await this.fetchDirections(from, to);

    this.setState({
      destination: {
        latitude: lat,
        longitude: lng
      },
      directions
    });
  };

  fetchVenues = (latitude, longitude) => {
    const apiUrl = `${FOURSQUARE_API_URL}&ll=${latitude},${longitude}`;

    return fetch(apiUrl)
      .then(response => response.json())
      .then(({ response }) => response.venues);
  };

  fetchDirections = (from, to) => {
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
          accessToken={MAPBOX_ACCESS_TOKEN}
          onUserLocationUpdate={this.onUserLocationUpdate}
        >
          <Destination {...destination} />
          <Route {...route} />
        </Map>
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
