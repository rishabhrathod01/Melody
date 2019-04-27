import React,{Component} from 'react';
import {View , Text,TouchableHighlight,StyleSheet,Image} from 'react-native';
import { BottomTabBar } from 'react-navigation';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

class TabBarComponent extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <View>
                <TouchableHighlight style={{height:50,borderTopWidth:0.5}} underlayColor="#FFF" onPress={()=>this.props.navigation.navigate('Player')}>
                    <View style={styles.itemContainer}>
                        <View style={{flexDirection:'row',alignItems:'center'}}> 
                            <Image style={{borderRadius:5,margin:5}} source={{uri:"http://storage.googleapis.com/automotive-media/"+"album_art.jpg",height:40,width:40,cache:'force-cache'}}></Image>
                            <View style={{flexDirection:'column',flexGrow:1}}>
                                <Text>Title</Text>
                                <Text>Artist</Text>
                            </View>
                            <View style={{justifyContent:'flex-end',flexBasis:30}}>
                                <TouchableHighlight >
                                    <View>
                                        <Icon name="ios-play" size={30} />
                                    </View>
                                </TouchableHighlight>
                            </View>
                            
                        </View>
                        
                    </View>
                </TouchableHighlight>
                <BottomTabBar {...this.props} />
            </View>
        )
    }
}



const styles = StyleSheet.create({
    itemContainer:{
        flex:1,
        flexDirection:'row',
        alignItems:'center'
    }
});
  

const mapStateToProps = (state) =>({
    // tracks :state.track.tracks,
})
  

export default connect(mapStateToProps)(TabBarComponent);