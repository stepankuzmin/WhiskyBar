// @flow

import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';

type Props = {
  accessToken: string,
  onUserLocationUpdate: Function
};

class Map extends PureComponent<Props> {
  componentDidMount() {
    const { accessToken } = this.props;
    MapboxGL.setAccessToken(accessToken);
  }

  render() {
    const { onUserLocationUpdate } = this.props;

    return (
      <MapboxGL.MapView
        styleURL={MapboxGL.StyleURL.Dark}
        zoomLevel={16}
        zoomEnabled
        localizeLabels
        showUserLocation
        onUserLocationUpdate={onUserLocationUpdate}
        userTrackingMode={MapboxGL.UserTrackingModes.Follow}
        style={sheet.container}
      />
    );
  }
}

const sheet = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Map;
