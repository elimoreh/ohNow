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
import { firstAction } from '../../redux/actions'

const mapStateToProps = state => ({ loggedIn: state.authReducer.loggedIn });


function ProfileScreen({loggedIn, firstAction}) {
  // console.warn(state);
 
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text> Hello!</Text>
      </ScrollView>
    </View>
  );
}

export default ProfileScreen = connect(mapStateToProps)(ProfileScreen);

ProfileScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
