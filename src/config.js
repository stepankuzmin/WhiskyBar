// @flow

export const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;

const clientId = process.env.FOURSQUARE_CLIENT_ID;
const clientSecret = process.env.FOURSQUARE_CLIENT_SECRET;

// https://developer.foursquare.com/docs/api/venues/search
const FOURSQUARE_API_PARAMS = {
  client_id: clientId,
  client_secret: clientSecret,
  intent: 'browse',
  limit: 10,
  query: 'bar',
  radius: '1000',
  v: '20180323'
};

const queryParams = Object.keys(FOURSQUARE_API_PARAMS)
  .map(key => `${key}=${FOURSQUARE_API_PARAMS[key]}`)
  .join('&');

export const FOURSQUARE_API_URL = `https://api.foursquare.com/v2/venues/search?${queryParams}`;
