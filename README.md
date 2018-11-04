# WhiskeyBar

![Screenshot](https://raw.githubusercontent.com/stepankuzmin/WhiskeyBar/master/screenshot.png)

> Well, show me the way
> To the next whisky bar

## Building from source

You have to install [Xcode](https://developer.apple.com/xcode/).

Clone source code

```sh
git clone https://github.com/stepankuzmin/WhiskeyBar.git
cd WhiskeyBar
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
