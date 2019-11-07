import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import EditorsScreen from '../screens/EditorsScreen';
import SeriesScreen from '../screens/SeriesScreen';
import VolumesScreen from '../screens/VolumesScreen';
import BookScreen from '../screens/BookScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home{focused ? '' : '-outline'}`
          : 'md-home'
      }
    />
  ),
};

HomeStack.path = '';

const AboutStack = createStackNavigator(
  {
    About: AboutScreen,
  },
  config
);

AboutStack.navigationOptions = {
  tabBarLabel: 'About',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused}
      name={
            Platform.OS === 'ios'
              ? `ios-information-circle${focused ? '' : '-outline'}`
              : 'md-information-circle'
          } />
  ),
};

AboutStack.path = '';

const EditorsStack = createStackNavigator(
  {
    Editors: EditorsScreen,
  },
  config
);

EditorsStack.navigationOptions = {
  tabBarLabel: 'Editori',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-book' : 'md-book'} />
  ),
};

EditorsStack.path = '';

const SeriesStack = createStackNavigator(
  {
    Series: SeriesScreen,
    Volumes: VolumesScreen,
    Book: BookScreen,
  },
  config
);

SeriesStack.navigationOptions = {
  tabBarLabel: 'Collane',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-albums' : 'md-albums'} />
  ),
};

SeriesStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  EditorsStack,
  SeriesStack,
  AboutStack,
});

tabNavigator.path = '';

export default tabNavigator;
