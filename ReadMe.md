# Volo Gif Search App

A `react-native` gifs search app that show the search suggestions list & on selecting any of the suggestion shows gifs related to selection.

### How it works

![](https://github.com/rahulsolanki1818/VoloPayGifSearch/blob/main/volopaygif.gif)

### System requirements

- Node
- npm OR yarn
- CocoaPods
- XCode
- AndroidStudio

For setting up the whole environment for react-native apps, check out [this](https://reactnative.dev/docs/environment-setup).

### Installation

Install the dependencies and devDependencies and start the server.

```sh
$ git clone https://github.com/rahulsolanki1818/VoloPayGifSearch.git
$ cd VoloPayGifSearch
$ yarn
```

### Run Apps

Run iOS

```sh
$ npx pod-install ios
$ yarn ios
```

Run Android

- Open android emulator
- Run the following command

```sh
$ yarn android
```

`Note`: In case of any error while running the anroid verison of the app, build the app from the Android Studio and then run it on the emulator.

### Structure

```
src/
.
├── App.tsx
├── api
│   ├── APITypes.d.ts
│   ├── api.ts
│   ├── index.ts
│   └── utils.ts
├── components
│   ├── ImageCard.tsx
│   ├── SearchBox.tsx
│   ├── Separator.tsx
│   └── index.tsx
├── hooks
│   ├── index.ts
│   ├── useImageSearch.ts
│   └── useTagSearch.ts
├── router
│   ├── AppNavigator.ts
│   └── index.tsx
├── screens
│   ├── Home.tsx
│   └── index.tsx
└── theme
    ├── Colors.ts
    ├── Size.ts
    └── index.ts

6 directories, 19 files
```

- `src/App.tsx`: It contains app level implemenations which should be used at once in whole application lifecycle like AppNavigation.
- `src/components`: It contains all the reusable smaller unit of UI known as component.
- `src/api`: Api directory contains utils file. 
  - `Utils` file has 3 methods:
    - `createAxiosInstance` is used to create the shared axios instance which will be used to call every API.
    - `globalUserTokenInterceptor` to add `API_KEY` params to every api call.
    - `gifApiVersion` which returns `API_VERSION`.
  - `api.ts` contains each APIs used in the app.
- `src/hooks`: It contains reusable custom hooks like `useTagSearch` & `useImageSearch`.
- `src/router`: It contains them main `AppNavigator` which contains app's different screens with their respective `navigators`.
- `src/screens`: It contains all the app's screens.
- `src/theme`: It contains app's theme related files:
  - `Size.ts`: I have used `react-native-size-matters` which helps in scalling the size of UI elements depending upon the device sizes. So that UI looks consistent & pixel perfect on every device.
  - `Colors.ts` It contains all the colors used in the app.

### Development

- `Project Structure`: Used module wise directory structure as this makes code more readable.
- `Functional component`: It uses a functional component as it has better readability and performance than Class components.
- `Navigation flow`: Used react-navigation to create a single navigator for the app.
- `Styling`: Used stylesheet to avoid the inline styles as those are getting created in every re-render.
- `Orientation`: Used portrait orientation.

### Improvements

- Unit test cases for utility functions.
- UI improvements.
- Redux/Context api can be used to replace custom hooks.
