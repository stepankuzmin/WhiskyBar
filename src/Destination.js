// @flow

import React from 'react';
import MapboxGL from '@mapbox/react-native-mapbox-gl';

type Props = {
  latitude: number,
  longitude: number
};

const Destination = (props: Props) => {
  const { latitude, longitude } = props;

  if (!latitude || !longitude) {
    return null;
  }

  const point = MapboxGL.geoUtils.makePoint([longitude, latitude]);

  return (
    <MapboxGL.ShapeSource id='destination' shape={point}>
      <MapboxGL.CircleLayer
        id='destinationInnerCircle'
        style={styles.destination}
      />
    </MapboxGL.ShapeSource>
  );
};

const styles = MapboxGL.StyleSheet.create({
  destination: {
    circleRadius: 5,
    circleColor: 'white'
  }
});

export default Destination;
