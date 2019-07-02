import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

// import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/ProfileScreen';
import ExploreScreen from '../screens/ExploreScreen';
import ChatScreen from '../screens/ChatScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Profile',
};

const ExploreStack = createStackNavigator({
  Explore: ExploreScreen,
});

ExploreStack.navigationOptions = {
  tabBarLabel: 'Explore',
};

const ChatStack = createStackNavigator({
  Chat: ChatScreen,
});

ChatStack.navigationOptions = {
  tabBarLabel: 'Chat',
};

const bottomNav = createMaterialBottomTabNavigator({
  HomeStack,
  ExploreStack,
  ChatStack,
},
{
  initialRouteName: 'ExploreStack',
  activeColor: '#5DBCD2',
  inactiveColor: 'white',
  barStyle: { backgroundColor: 'black' },
});


export default bottomNav;
