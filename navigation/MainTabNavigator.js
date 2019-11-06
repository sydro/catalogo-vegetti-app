import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import EditorsScreen from '../screens/EditorsScreen';
import SeriesScreen from '../screens/SeriesScreen';
import VolumesScreen from '../screens/VolumesScreen';

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
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

HomeStack.path = '';

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

LinksStack.path = '';

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
  LinksStack,
});

tabNavigator.path = '';

export default tabNavigator;
