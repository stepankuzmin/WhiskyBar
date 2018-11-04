// @flow

import React from 'react';
import { StyleSheet } from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';

type Props = {
  children?: React.Node,
  onUserLocationUpdate: Function
};

const Map = (props: Props) => {
  const { children, onUserLocationUpdate } = props;

  return (
    <MapboxGL.MapView
      styleURL={MapboxGL.StyleURL.Dark}
      zoomLevel={16}
      zoomEnabled
      localizeLabels
      showUserLocation
      logoEnabled={false}
      attributionEnabled={false}
      onUserLocationUpdate={onUserLocationUpdate}
      userTrackingMode={MapboxGL.UserTrackingModes.Follow}
      style={sheet.container}
    >
      {children}
    </MapboxGL.MapView>
  );
};

Map.defaultProps = {
  children: null
};

const sheet = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Map;
