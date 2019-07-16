import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import AuthLoad from '../screens/Auth/AuthLoading'
import AuthStack from '../screens/Auth/AuthStack'

export default createAppContainer(
  createSwitchNavigator({
    Load: AuthLoad,
    Auth: AuthStack,
    App: MainTabNavigator,
  })
);