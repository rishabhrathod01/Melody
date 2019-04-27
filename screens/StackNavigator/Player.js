import React, {Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Image,StatusBar,Slider} from 'react-native';
import   Video  from 'react-native-video';
import { connect } from 'react-redux';
import Colors from '../../values/Colors';
import Controls from '../../components/Controls';
import SeekBar from '../../components/SeekBar';
import Fonts from '../../values/Fonts';
import Sound from 'react-native-sound';
import Icon from 'react-native-vector-icons/Ionicons';

const Header = (props) => {
    return(
        <View style={styles.header}>
            <TouchableOpacity onPress={()=>{props.navigation.goBack()}}>
              <Icon name="ios-arrow-down" size={30} />
            </TouchableOpacity>
            <Text
                style={styles.text}>NOW PLAYLING</Text>
            <Text></Text>
        </View>
    )
}

const TrackDetails = (props) => {
    return(
        <View style={{flexDirection:'column',alignItems:'center'}}>
            <Image 
                style={{margin:5,borderRadius:5}} 
                source={{uri:props.song.cover,height:300,width:300}}/>
            <View>
                <Text style={styles.text} ellipsizeMode="tail" numberOfLines={1}>{props.song.fileName}</Text>
                <Text style={styles.text} ellipsizeMode="tail" numberOfLines={1}>{props.song.author}</Text>
            </View>
        </View>
    )
}

class Player extends Component{
    constructor(props) {
        super(props);
        this.state = {
          paused: false,
          totalLength: 1,
          currentPosition: 0,
          currentSong : null,
        };
      }
    

    componentWillMount(){
      let song = this.props.navigation.getParam('song',null)
      if(!song){
        
      }else{
        this.setState({
          currentSong : song,
        })
        alert(JSON.stringify(song))
        setTimeout(() => {
          var sound = new Sound(song.path, '', (error) => {
            if (error) {
              console.log('failed to load the sound', error);
            }
          });
  
          setTimeout(() => {
            sound.play((success) => {
              if (success) {
                console.log('successfully finished playing');
              } else {
                console.log('playback failed due to audio decoding errors');
              }
            });
          }, 100);
        }, 100);
      }  
    }

//     // 
// // Seek to a specific point in seconds
// whoosh.setCurrentTime(2.5);

// // Get the current playback point in seconds
// whoosh.getCurrentTime((seconds) => console.log('at ' + seconds));

// // Pause the sound
// whoosh.pause();

// // Stop the sound and rewind to the beginning
// whoosh.stop(() => {
//   // Note: If you want to play a sound after stopping and rewinding it,
//   // it is important to call play() in a callback.
//   whoosh.play();
// });

    componentWillUnMount(){
    	sound.release();
    }

    setDuration(data) {
      this.setState({totalLength: Math.floor(data.duration)});
    }
  
    setTime(data) {
      this.setState({currentPosition: Math.floor(data.currentTime)});
    }
  
    seek(time) {
      var time = Math.round(time);
      this.refs.audioElement && this.refs.audioElement.seek(time);
      this.setState({
        currentPosition: time,
        paused: false,
      });
    }
    
    onBack() {
      if (this.state.currentPosition < 10 && this.state.selectedTrack > 0) {
        this.refs.audioElement && this.refs.audioElement.seek(0);
        this.setState({ isChanging: true });
        setTimeout(() => this.setState({
          currentPosition: 0,
          paused: false,
          totalLength: 1,
          isChanging: false,
          selectedTrack: this.state.selectedTrack - 1,
        }), 0);
      } else {
        this.refs.audioElement.seek(0);
        this.setState({
          currentPosition: 0,
        });
      }
    }
  
    onForward() {
      if (this.state.selectedTrack < this.props.tracks.length - 1) {
        this.refs.audioElement && this.refs.audioElement.seek(0);
        this.setState({ isChanging: true });
        setTimeout(() => this.setState({
          currentPosition: 0,
          totalLength: 1,
          paused: false,
          isChanging: false,
          selectedTrack: this.state.selectedTrack + 1,
        }), 0);
      }
    }

    render() {
      if(!this.state.currentSong){
        return(
          <View style={styles.container}>
          <StatusBar hidden={true} />
          <Header navigation={this.props.navigation}/>
          <Slider 
            style={{color:Colors.PRIMARY}}/>
          <Controls
            onPressPlay={() => this.setState({paused: false})}
            onPressPause={() => this.setState({paused: true})}
            paused={this.state.paused}/>
        </View>
        )
      }
      else{
        return (
          <View style={styles.container}>
            <StatusBar hidden={true} />
            <Header navigation={this.props.navigation}></Header>
            <TrackDetails song={this.state.currentSong}/>
            <Slider 
              style={{color:Colors.PRIMARY}}/>
            <Text onPress={()=>this.sound.play()}>PLAY</Text>
            {/* <Controls
              onPressPlay={() => this.setState({paused: false})}
              onPressPause={() => this.setState({paused: true})}
              paused={this.state.paused}/> */}
          </View>
        );
      }
    }
  }

const styles = StyleSheet.create({
    container:{
      backgroundColor:'rgba(0,0,0,0.05)',
      flex:1
    },
    header:{
      flexDirection:'row',
      height:40,
      justifyContent:'space-between',
      margin:20
    },
    itemContainer:{
      flex:1,
      alignItems:'center',
      margin:10,
      flexDirection:'row',
    },
    message:{

    },
    button:{

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
    audioElement:{
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    }
});
  


const mapStateToProps = (state) =>({
  tracks :state.track.tracks,
})

const mapDispatchToProps  = (dispatch) => ({
  addTracks :  (tracks)=>dispatch(addTracks(tracks)),
})

export default connect(mapStateToProps,mapDispatchToProps)(Player);