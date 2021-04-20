import React, { Component } from "react";
import {
 StyleSheet, 
 PanResponder,
 Animated,
 Image
} from "react-native";
import Man from './images/man.png';


export default class Draggable extends Component {
  constructor(props) {
    super(props);
  }

  pan = new Animated.ValueXY();
  
  panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      this.pan.setOffset({
        x: this.pan.x._value,
        y: this.pan.y._value
      });
    },
    onPanResponderMove: Animated.event([
      null,
      { dx: this.pan.x, dy: this.pan.y }
    ]),
    onPanResponderRelease: (e, gesture) => {
        if (this.isDropArea(gesture)) {
          console.log("hihi")
        }
        else {
          Animated.spring(this.pan, {
            toValue: { x: 0, y: 0 },
            friction: 5
          }).start();
        }
        
    }
  })
  isDropArea(gesture) {
    if(100 <= gesture.moveY && gesture.moveY <= 250){
      if(0 < gesture.moveX && gesture.moveX <  133){
        this.props.showMenu(0)
        return 1
      } else if(133 < gesture.moveX && gesture.moveX <  266){
        // this.showMenu(2)
        this.props.showMenu(1)      
        return 2  
      } else{
        // this.showMenu(3)
        this.props.showMenu(2)
        return 3
      }
    } else if (250 <= gesture.moveY && gesture.moveY <= 400){
      if(0 < gesture.moveX && gesture.moveX <  133){
        // this.showMenu(4)
        this.props.showMenu(3)
        return 4
      } else if(133 < gesture.moveX && gesture.moveX <  266){
        // this.showMenu(5)
        this.props.showMenu(4)
        return 5
      } else{
        // this.showMenu(6)
        this.props.showMenu(5)
        return 6
      }
    } else if (250 <= gesture.moveY && gesture.moveY <= 550){
      if(0 < gesture.moveX && gesture.moveX <  133){
        // this.showMenu(7)
        this.props.showMenu(6)
        return 7
      } else if(133 < gesture.moveX && gesture.moveX <  266){
        // this.showMenu(8)
        this.props.showMenu(7)
        return 8
      } else{
        // this.showMenu(9)
        this.props.showMenu(8)  
        return 9      
      }
    }
  }

 render() {
   return (
      <Animated.View
      style={{
        transform: [{ translateX: this.pan.x }, { translateY: this.pan.y }]
      }}
      {...this.panResponder.panHandlers}
    >
      <Image source={Man} style={{height: 60, width: 60, position: 'absolute'}}></Image>
    </Animated.View>
   );
 }
};