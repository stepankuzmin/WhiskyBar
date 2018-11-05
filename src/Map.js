// @flow

import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import bbox from '@turf/bbox';

import Route from './Route';
import Destination from './Destination';
import { MAPBOX_ACCESS_TOKEN } from './config';

MapboxGL.setAccessToken(MAPBOX_ACCESS_TOKEN);

type Props = {
  route: Object,
  destination: Object,
  onUserLocationUpdate: Function
};

class Map extends PureComponent<Props> {
  componentDidUpdate(prevProps) {
    if (prevProps.route !== this.props.route) {
      const bb = bbox(this.props.route.geometry);
      const ne = [bb[2], bb[1]];
      const sw = [bb[0], bb[3]];
      this._map.fitBounds(ne, sw, 40, 500);
    }
  }

  render() {
    const {
      route,
      destination,
      onUserLocationUpdate,
      onDidFinishLoadingMap
    } = this.props;

    return (
      <MapboxGL.MapView
        ref={ref => (this._map = ref)}
        styleURL={MapboxGL.StyleURL.Dark}
        zoomLevel={16}
        zoomEnabled
        localizeLabels
        showUserLocation
        logoEnabled={false}
        attributionEnabled={false}
        onUserLocationUpdate={onUserLocationUpdate}
        userTrackingMode={MapboxGL.UserTrackingModes.Follow}
        onDidFinishLoadingMap={onDidFinishLoadingMap}
        style={sheet.container}
      >
        <Route {...route} />
        <Destination {...destination} />
      </MapboxGL.MapView>
    );
  }
}

const sheet = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Map;
