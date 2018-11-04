// @flow

import React from 'react';
import MapboxGL from '@mapbox/react-native-mapbox-gl';

type Props = {
  geometry: Object
};

const Route = (props: Props) => {
  const { geometry } = props;

  if (!geometry) {
    return null;
  }

  return (
    <MapboxGL.ShapeSource id='routeSource' shape={geometry}>
      <MapboxGL.LineLayer id='routeFill' style={styles.route} />
    </MapboxGL.ShapeSource>
  );
};

const styles = MapboxGL.StyleSheet.create({
  route: {
    lineColor: 'white',
    lineWidth: 3,
    lineOpacity: 0.84
  }
});

export default Route;
