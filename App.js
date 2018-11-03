// @flow

import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import mbxDirections from '@mapbox/mapbox-sdk/services/directions';

import Map from './Map';

const accessToken = process.env.MAPBOX_ACCESS_TOKEN;
const directionsClient = mbxDirections({ accessToken });

type Props = {};
class App extends PureComponent<Props> {
  state = {
    latitude: 0.0,
    longitude: 0.0
  };

  componentDidUpdate() {
    const { latitude, longitude } = this.state;

    console.log('WOOT', { latitude, longitude });
  }

  onUserLocationUpdate = location => {
    this.setState({ ...location });
  };

  // fetchDirections = async () => {
  //   let res = null;
  //   try {
  //     res = await directionsClient.getDirections({
  //       profile: 'walking',
  //       waypoints: [{ coordinates: [2.2, 1.1] }, { coordinates: [2.2, 1.1] }]
  //     });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  render() {
    return (
      <View style={styles.container}>
        <Map
          accessToken={accessToken}
          onUserLocationUpdate={this.onUserLocationUpdate}
        />
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
