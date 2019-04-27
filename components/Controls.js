import React from 'react';
import { View,Text,StyleSheet,TouchableOpacity} from 'react-native';


const Controls = ({
    paused,
    shuffleOn,
    repeatOn,
    onPressPlay,
    onPressPause,
    onBack,
    onForward,
    onPressShuffle,
    onPressRepeat,
    forwardDisabled,
  }) => (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.0} onPress={onPressShuffle}>
        {/* <Image style={[styles.secondaryControl, shuffleOn ? [] : styles.off]}
          source={require('../img/ic_shuffle_white.png')}/> */}
          <Text>Shuffle</Text>
      </TouchableOpacity>
      <View style={{width: 40}} />
      <TouchableOpacity onPress={onBack}>
        {/* <Image source={require('../img/ic_skip_previous_white_36pt.png')}/> */}
        <Text>Back</Text>
      </TouchableOpacity>
      <View style={{width: 20}} />
      {!paused ?
        <TouchableOpacity onPress={onPressPause}>
          <View style={styles.playButton}>
            {/* <Image source={require('../img/ic_pause_white_48pt.png')}/> */}
            <Text>Play</Text>
          </View>
        </TouchableOpacity> :
        <TouchableOpacity onPress={onPressPlay}>
          <View style={styles.playButton}>
            <Text>Pause</Text>
            {/* <Image source={require('../img/ic_play_arrow_white_48pt.png')}/> */}
          </View>
        </TouchableOpacity>
      }
      <View style={{width: 20}} />
      <TouchableOpacity onPress={onForward}
        disabled={forwardDisabled}>
        <Text>Forward</Text>
        {/* <Image style={[forwardDisabled && {opacity: 0.3}]}
          source={require('../img/ic_skip_next_white_36pt.png')}/> */}
      </TouchableOpacity>
      <View style={{width: 40}} />
      <TouchableOpacity activeOpacity={0.0} onPress={onPressRepeat}>
          <Text>Repeat</Text>
        {/* <Image style={[styles.secondaryControl, repeatOn ? [] : styles.off]}
          source={require('../img/ic_repeat_white.png')}/> */}
      </TouchableOpacity>
    </View>
  );
 
 
const styles = StyleSheet.create({
    container:{
      backgroundColor:'rgba(0,0,0,0.05)',
      flex:1,
      flexDirection:'row',
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
    playButton:{

    }
  });
  
  export default Controls;