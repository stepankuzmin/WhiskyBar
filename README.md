<img align="right" src="https://raw.githubusercontent.com/stepankuzmin/WhiskyBar/master/screenshot.png">

# WhiskyBar

React Native App that shows you the way to the next whisky bar.

> Well, show me the way to the next whisky bar

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

Create `.env` file with your Mapbox [access token](https://www.mapbox.com/account/access-tokens/)

```sh
echo "MAPBOX_ACCESS_TOKEN=<YOUR TOKEN HERE>" > .env
```

Run app in iOS simulator

```sh
yarn start:ios
```
