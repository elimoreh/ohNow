import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';

const mapStateToProps = state => ({ state: state.initialReducer });

function ProfileScreen({state}) {
  console.warn(state);
  return (
    <View style={styles.container}>
      <ScrollView>
      </ScrollView>
    </View>
  );
}

export default connected = connect(mapStateToProps)(ProfileScreen);

ProfileScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
