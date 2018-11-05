<img align="right" src="https://raw.githubusercontent.com/stepankuzmin/WhiskyBar/master/screenshot.png">

# WhiskyBar

React Native App that shows you the way to the next whisky bar. Build with [Mapbox Maps SDK for React Native](https://github.com/mapbox/react-native-mapbox-gl).

## Building from source

You have to install [Xcode](https://developer.apple.com/xcode/).

Clone source code

```sh
git clone https://github.com/stepankuzmin/WhiskyBar.git
cd WhiskyBar
yarn
```

Install Pods

```sh
cd ios
pod install
cd ..
```

You have to populate your environment with `MAPBOX_ACCESS_TOKEN`, `FOURSQUARE_CLIENT_ID` and `FOURSQUARE_CLIENT_SECRET` variables.

Run app in iOS simulator

```sh
yarn start:ios
```
