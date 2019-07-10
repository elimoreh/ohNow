import React from 'react';
import {
  Animated,
  Image,
  Dimensions,
  StyleSheet,
  Text,
  PanResponder,
  View,
} from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const users = [
  {id: 1, uri: 'https://ohnowtest.s3-us-west-1.amazonaws.com/ally.jpg', name:'Ally'},
  {id: 2, uri: 'https://ohnowtest.s3-us-west-1.amazonaws.com/talia.jpg', name:'Talia'},
  {id: 3, uri: 'https://ohnowtest.s3-us-west-1.amazonaws.com/tarin.jpg', name:'Tarin'},
  {id: 5, uri: 'https://ohnowtest.s3-us-west-1.amazonaws.com/jamie.jpg', name:'Jamie'},
  {id: 6, uri: 'https://ohnowtest.s3-us-west-1.amazonaws.com/kayla.jpg', name:'Kayla'},
  {id: 7, uri: 'https://ohnowtest.s3-us-west-1.amazonaws.com/hailey.jpg', name:'Hailey'},
  {id: 8, uri: 'https://ohnowtest.s3-us-west-1.amazonaws.com/rebecca.jpg', name:'Rebecca'},
  {id: 9, uri: 'https://ohnowtest.s3-us-west-1.amazonaws.com/laura.jpg', name:'Laura'},
  {id: 10, uri: 'https://ohnowtest.s3-us-west-1.amazonaws.com/steph.jpg', name:'Steph'},
  {id: 11, uri: 'https://ohnowtest.s3-us-west-1.amazonaws.com/natalia.jpg', name:'Natalia'},
  {id: 12, uri: 'https://ohnowtest.s3-us-west-1.amazonaws.com/shira.jpg', name:'Shira'},
  {id: 13, uri: 'https://ohnowtest.s3-us-west-1.amazonaws.com/dana.jpg', name:'dana'},
  {id: 14, uri: 'https://ohnowtest.s3-us-west-1.amazonaws.com/remy.jpg', name:'Remy'},
  {id: 15, uri: 'https://ohnowtest.s3-us-west-1.amazonaws.com/lana.jpg', name:'Lana'},
]


export default class ExploreScreen extends React.Component {
  constructor(){
    super()
    this.position = new Animated.ValueXY();
    this.state = {
      currentIndex: 0
    }
    this.rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ['-10deg', '0deg', '10deg'],
      extrapolate: 'clamp', 
    })
    this.likeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp', 
    })
    this.disLikeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp', 
    })
    this.nextCardOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1,0,1],
      extrapolate: 'clamp', 
    })
    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1,.8,1],
      extrapolate: 'clamp', 
    })

    this.rotateandTransform = {
      transform: [{
        rotate: this.rotate,
      },
      ...this.position.getTranslateTransform()
      ]
    }
  }
  componentWillMount(){
    this.PanResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt,gestureState) => {
        this.position.setValue({ x:gestureState.dx, y:gestureState.dy })
      },
      onPanResponderRelease: (evt,gestureState) =>{
        if(gestureState.dx > 120){
          Animated.spring(this.position, {
            toValue: { x: SCREEN_WIDTH + 80, y: gestureState.dy}
          }).start(()=> {
            this.setState({currentIndex: this.state.currentIndex + 1}, () => {
              this.position.setValue({ x: 0, y: 0})
            })
          })
        } else if(gestureState.dx < -120){
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH - 80, y: gestureState.dy}
          }).start(()=> {
            this.setState({currentIndex: this.state.currentIndex + 1}, () => {
              this.position.setValue({ x: 0, y: 0 })
            })
          })
        } else {
          Animated.spring(this.position, {
            toValue: { x: 0, y: 0 }, 
            friction: 4
          }).start()
        }
      }
    })
  }
  renderUsers (users){
    return users.map((user,i) => {
      if (i < this.state.currentIndex) return null;
      else if(i === this.state.currentIndex) {
        return (
          <Animated.View {...this.PanResponder.panHandlers} 
          key={user.id} style={[ this.rotateandTransform, {height: SCREEN_HEIGHT - 120, width: SCREEN_WIDTH, padding: 10, position: 'absolute'}]}>
            <Animated.View style={{ opacity: this.likeOpacity, position:'absolute', top: 50, left: 40, zIndex: 100}}>
              <Text style={{transform:[{rotate : '-30deg'}],borderWidth: 1, borderColor:'green', color:'green', fontSize: 32, fontWeight:'800', padding: 10 }}>NOW!</Text>
            </Animated.View>
            <Animated.View style={{opacity: this.disLikeOpacity, position:'absolute', top: 50, right: 40, zIndex: 100}}>
              <Text style={{transform:[{rotate : '30deg'}],borderWidth: 1, borderColor:'red', color:'red', fontSize: 32, fontWeight:'800', padding: 10 }}>NEVER!</Text>
            </Animated.View>
            <View style={{ position:'absolute', bottom: 20, left: 20, zIndex: 80}}>
              <Text style={{color:'white', fontSize: 28, fontWeight:'800', padding: 10 }}>{user.name}</Text>
            </View>
            <Image
              style={{flex:1, height: null, width: null, resizeMode: 'cover', borderRadius: 20}}
              source={{uri: user.uri}}
              />
          </Animated.View>
        )
      } else {
        return (
          <Animated.View
          {...this.PanResponder.panHandlers}
          key={user.id} style={[{
            opacity: this.nextCardOpacity,
            transform: [{ scale: this.nextCardScale }],
            height: SCREEN_HEIGHT - 120, width: SCREEN_WIDTH, padding: 10, position: 'absolute'
          }]}>
          <Animated.View style={{ opacity: 0, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
            <Text style={{ borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 10 }}>NOW!</Text>
          </Animated.View>
          <Animated.View style={{ opacity: 0, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
            <Text style={{ borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10 }}>NEVER!</Text>
          </Animated.View>
          <View style={{ position:'absolute', bottom: 20, left: 20, zIndex: 80}}>
              <Text style={{color:'white', fontSize: 28, fontWeight:'800', padding: 10 }}>{user.name}</Text>
          </View>
          <Image
            style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
            source={{uri: user.uri}} />
        </Animated.View>           
        )
      }
    }).reverse()   
  }

  render (){
    return (
      <View style={{flex: 1}}>
        <View style={{height:40}}>
          
        </View>
        <View style={{flex:1}}>
         {this.renderUsers(users)}
        </View>
        <View style={{height:80}}>
         
        </View>
      </View>
    );
  }
   
}

ExploreScreen.navigationOptions = {
  header: null,
};
