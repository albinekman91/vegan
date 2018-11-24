import React from 'react';
import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';

export default createStackNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  HomeScreen,
  DetailsScreen,
});