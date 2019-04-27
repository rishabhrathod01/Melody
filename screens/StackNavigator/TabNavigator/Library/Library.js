import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,ActivityIndicator,FlatList,Image,DeviceEventEmitter,Vibration,AsyncStorage} from 'react-native';
import {addTracks} from '../../../../store/actions/track';
import { connect } from 'react-redux';
import SongItem from '../../../../components/Library/SongItem';
import MusicFiles from 'react-native-get-music-files';
import Permissions from 'react-native-permissions';
import Fonts from  '../../../../values/Fonts';


class Library extends Component{
  constructor(props){
    super(props)
    this.state = {  songs : []}
  }
 
  _requestPermission = () => {
    Permissions.request('storage').then(response => {
      // Returns once the user has chosen to 'allow' or to 'not allow' access
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      this.setState({ storagePermission: response })
    })
  }

  _storeData = async (songs) => {
    try {
      await AsyncStorage.setItem('songs',JSON.stringify(songs));
    } catch (error) {
      // Error saving data
    }
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('songs');
      if (value !== null) {
        // We have data!!
        this.setState({
          songs:JSON.parse(value)
        })
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  onSongPress = (song) => {
    // Vibration.vibrate(10);
    this.props.navigation.navigate('Player',{song:song});
  }

  componentWillMount() {
    this._retrieveData();
    Permissions.check('storage').then(response => {
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      if(response!=='authorized'){
        this._requestPermission()
      }
    })

    
    
    DeviceEventEmitter.addListener(
        'onBatchReceived',
        (params) => {
          // alert("Received"+JSON.stringify(params.batch))
            this._storeData([...this.state.songs,...params.batch]);
            this.setState({songs : [
                ...this.state.songs,
                ...params.batch
            ]});
        }
    )
  }
  
  componentDidMount(){
    MusicFiles.getAll({
        id : true,
        blured : false,
        artist : true,
        duration : true, //default : true
        cover : true, //default : true,
        title : true,
        cover : true,
        batchNumber : 5, //get 5 songs per batch
        minimumSongDuration : 10000, //in miliseconds,
        fields : ['title','artwork','duration','artist','genre','lyrics','albumTitle']
    });
    this._storeData()
  }
  
  _renderItem = ({item}) => (
    <SongItem  song={item} onSongPress={this.onSongPress.bind(this)}/>
  );
  
  _keyExtractor = (item, index) => index+'';
  
  render() {
    if(this.state.songs.length===0){
      return(
        <View style={styles.container}>
          <Text style={styles.heading}>Songs.</Text>
          <ActivityIndicator
          size="large" />
        </View>
      )
    }else{
      return (
        <View style={styles.container}>
          <Text style={styles.heading}>Songs.</Text>
          
          <FlatList
            data={this.state.songs}
            extraData={this.state}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
      );
    }
    
  }
}


const styles = StyleSheet.create({
  container:{
    flex:1
  },
  heading:{
    fontSize:30,
    margin:10,
    fontFamily:Fonts.Regular,
    color:'black'
  },
});


const mapStateToProps = (state) =>({
  tracks :state.track.tracks,
})

const mapDispatchToProps  = (dispatch) => ({
  addTracks :  (tracks)=>dispatch(addTracks(tracks)),
})

export default connect(mapStateToProps,mapDispatchToProps)(Library);