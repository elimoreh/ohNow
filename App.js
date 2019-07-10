import React from 'react';
import { Provider } from 'react-redux';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import store from './src/redux/store';

 export default function App(props) {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      </Provider>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#808088',
  },
});
