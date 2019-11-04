import React from 'react';

import {createAppContainer, withNavigationFocus} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {Ionicons} from '@expo/vector-icons';
import {Platform} from 'react-native';

import HomeScreen from '../HomeScreen'
import CameraScreen from '../CameraScreen'


BottomNavigator = createBottomTabNavigator({  
  Home: HomeScreen,
  Camera: CameraScreen ,
 },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        var iconName;
        var outline = (focused)
          ? '' : '';
        if (navigation.state.routeName == 'Camera') {
          Platform.OS === 'ios'
            ? iconName = 'ios-camera'
            : iconName = 'md-camera'
        } else if (navigation.state.routeName == 'Home') {
          Platform.OS === 'ios'
            ? iconName = 'ios-home'
            : iconName = 'md-home'
        }else if (navigation.state.routeName == 'Library') {
            Platform.OS === 'ios'
              ? iconName = 'ios-people'
              : iconName = 'md-people'
          }
  
        return <Ionicons name={iconName + outline} size={25} color={tintColor}/>;
      }
    }),
    tabBarOptions: {

      activeTintColor: '#FFFFFF',
      inactiveTintColor: 'gray',
      style: {
        backgroundColor: '#022F40',
      }
    }
  });  

export default Navigation = createAppContainer(BottomNavigator) 