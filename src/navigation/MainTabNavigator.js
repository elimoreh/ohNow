import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

// import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Profile',
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Explore',
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Chat',
};

const bottomNav = createMaterialBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
},
{
  initialRouteName: 'LinksStack',
  activeColor: '#5DBCD2',
  inactiveColor: 'white',
  barStyle: { backgroundColor: 'black' },
});


export default bottomNav;
