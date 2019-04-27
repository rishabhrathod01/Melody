import React, { Component } from 'react'
import TabNavigator from './TabNavigator/TabNavigator';
import PlayerScreen from './Player';
import {  createAppContainer,createStackNavigator  } from 'react-navigation';


const StackNavigator = createStackNavigator({
    TabNavigation :{ screen: TabNavigator     },
    Player: { screen: PlayerScreen }
  }, {
    headerMode: 'none',
    mode:       'modal'
  });
  
const AppContainer =  createAppContainer(StackNavigator);

export default AppContainer;