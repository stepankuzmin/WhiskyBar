// @flow
import mapboxDirections from '@mapbox/mapbox-sdk/services/directions';

import {
  MAPBOX_ACCESS_TOKEN,
  FOURSQUARE_CLIENT_ID,
  FOURSQUARE_CLIENT_SECRET,
  FOURSQUARE_API_URL
} from './config';

const directionsClient = mapboxDirections({ accessToken: MAPBOX_ACCESS_TOKEN });

// https://developer.foursquare.com/docs/api/venues/search
export const fetchVenues = ({ latitude, longitude }) => {
  const params = {
    client_id: FOURSQUARE_CLIENT_ID,
    client_secret: FOURSQUARE_CLIENT_SECRET,
    intent: 'browse',
    limit: 10,
    query: 'bar',
    radius: 1000,
    v: '20180323',
    ll: `${latitude},${longitude}`
  };

  const queryParams = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join('&');

  const apiUrl = `${FOURSQUARE_API_URL}?${queryParams}`;

  return fetch(apiUrl)
    .then(response => response.json())
    .then(({ response }) => response.venues);
};

export const fetchDirections = (origin, destination) => {
  const from = [origin.longitude, origin.latitude];
  const to = [destination.longitude, destination.latitude];

  return directionsClient
    .getDirections({
      profile: 'walking',
      geometries: 'geojson',
      waypoints: [{ coordinates: from }, { coordinates: to }]
    })
    .send()
    .then(response => response.body);
};
