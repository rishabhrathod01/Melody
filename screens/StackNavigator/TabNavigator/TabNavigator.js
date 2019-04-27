import React from "react";
import {Vibration} from 'react-native'
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import Library from "./Library/Library";
import Favorites from "./Favorites/Favorites";
import Artist from './Artist/Artist';
import Playlist from './Playlist/Playlist'
import TabBarComponent from '../../../components/TabBar/TabBarComponent';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/AntDesign';
import FIcon from 'react-native-vector-icons/Feather';
import Fonts from '../../../values/Fonts';

var TabNavigator = createBottomTabNavigator({
  AllSongs : {
    screen: Library,
    navigationOptions: {
      header: null,
      tabBarLabel:"All Song",
    tabBarIcon: ({tintColor,focused})=> {var size=(!focused?20:26);return(<FIcon name="music" style={{color:tintColor}} size={size}/>)},
    }
  },
  Artist : {
    screen: Artist,
    navigationOptions: {
      header: null,
      tabBarIcon: ({tintColor,focused})=> {var size=(!focused?20:26);return(<Icon name="user" style={{color:tintColor}}  size={size}/>)},
    }
  },
  Playlist : {
    screen: Playlist,
    navigationOptions: {
      header: null,
      tabBarIcon: ({tintColor,focused})=> {var size=(!focused?20:26);return(<MCIcon name="playlist-music-outline" style={{color:tintColor}} size={size}/>)},
    }
  },
  Favorites: {
    screen: Favorites,
    navigationOptions: {
      header: null,
      tabBarIcon: ({tintColor,focused})=> {var size=(!focused?20:26);return(<Icon name="hearto" style={{color:tintColor}} size={size}/>)},
    }
  },
  Settings: {
    screen: Favorites,
    navigationOptions: {
      header: null,
      tabBarIcon: ({tintColor,focused})=>{var size=(!focused?20:26);return(<FIcon name="settings" style={{color:tintColor}} size={size}/>)},
    }
  },
},
{
  tabBarOptions:{
    activeTintColor:'#222f3e',
    inactiveTintColor:'#c8d6e5',
    showLabel:true,
    style:{
      borderColor:'white',
      borderWidth:0,
    },
    tabStyle:{
      backgroundColor:'#fff',
    },
    labelStyle: {
      fontSize: 10,
      fontFamily: Fonts.Regular,
    },
  },
  lazy:true,
  tabBarOnPress:()=>{Vibration.vibrate(1000);},
  tabBarComponent: props =>
    <TabBarComponent
      {...props}
      style={{ borderTopColor: '#605F60' ,elevation:20,opacity:0.7}}
    />,
}
);

export default createAppContainer(TabNavigator);
