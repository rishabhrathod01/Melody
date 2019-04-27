import React, { Component } from 'react'
import { Text, View,TouchableHighlight ,StyleSheet,Image} from 'react-native'
import Fonts from '../../values/Fonts';
import Icon from 'react-native-vector-icons/SimpleLineIcons'

export default class SongItem extends Component {

  render() {
    let imageSource = (!this.props.song.cover)
    ? require('../../assets/Images/songPlaceholder.jpg')
    : {uri:this.props.song.cover,}
    let seconds = Math.floor((this.props.song.duration/1000)%60);
    let minutes = Math.floor((this.props.song.duration/60000)%60);
   
    return (
        <TouchableHighlight onPress={this.props.onSongPress.bind(this,this.props.song)}>  
          <View style={styles.itemContainer}>
          <View style={{elevation:10}}>
            <Image source={imageSource} style={{width: 70, height: 70,borderRadius:5}}></Image>  
          </View>
            <View style={styles.detailContainer}>
              <Text style={styles.text} ellipsizeMode='tail' numberOfLines={1}>{this.props.song.title}</Text>
              <Text style={styles.smalltext} ellipsizeMode='tail' numberOfLines={1}>{this.props.song.author}</Text>
              <Text style={styles.smalltext}>{minutes}:{seconds}</Text>
            </View>
            <View style={styles.iconContainer}>
              <Icon name="options-vertical" size={14} />
            </View>
            
          </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  itemContainer:{
    flex:1,
    height:70,
    alignItems:'center',
    margin:10,
    flexDirection:'row',
  },
  detailContainer:{
    flex:4,
    flexDirection:'column',
    padding:5
  },
  smalltext:{
    flex:1,
    fontFamily:Fonts.Light,
    fontSize:12,
  },
  text:{
    flex:2,
    fontFamily:Fonts.Regular,
  },
  iconContainer:{
    flex:0.2,
  }
})
