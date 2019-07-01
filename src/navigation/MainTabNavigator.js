import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

// import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/ProfileScreen';
import LinksScreen from '../screens/LinksScreen';
import ChatScreen from '../screens/ChatScreen';

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

const ChatStack = createStackNavigator({
  Chat: ChatScreen,
});

ChatStack.navigationOptions = {
  tabBarLabel: 'Chat',
};

const bottomNav = createMaterialBottomTabNavigator({
  HomeStack,
  LinksStack,
  ChatStack,
},
{
  initialRouteName: 'LinksStack',
  activeColor: '#5DBCD2',
  inactiveColor: 'white',
  barStyle: { backgroundColor: 'black' },
});


export default bottomNav;
