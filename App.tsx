// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


import 'react-native-gesture-handler';
import React from 'react'
import { Provider } from 'react-redux'
import { theme } from './src/core/theme'
import { StartScreen } from './src/navigations/StartScreen'
import store, { persistor } from './src/redux/store'
import { PersistGate } from 'redux-persist/integration/react'

export default function App() {
  return (
    <Provider theme={theme} store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StartScreen />
      </PersistGate>
    </Provider>
  )
}
