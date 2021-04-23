import React, { Component } from "react";
import {
 PanResponder,
 Animated,
 Image
} from "react-native";
import Man from './images/man.png';


export default class Draggable extends Component {
  constructor(props) {
    super(props);
    this.state={
      id: -1,
      checkout: false,
    }
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
        }
        else {
          Animated.spring(this.pan, {
            toValue: { x: 0, y: 0},
            friction: 5
          }).start();
        }
    },
  })
  isDropArea(gesture) {
    if(100 <= gesture.moveY && gesture.moveY <= 250){
      if(0 < gesture.moveX && gesture.moveX <  133){
        this.props.showMenu(0)
        this.setState({id: 0})
        return 1
      } else if(133 < gesture.moveX && gesture.moveX <  266){
        // this.showMenu(2)
        this.props.showMenu(1)      
        this.setState({id: 1})
        return 2
      } else{
        // this.showMenu(3)
        this.props.showMenu(2)
        this.setState({id: 2})
        return 3
      }
    } else if (250 <= gesture.moveY && gesture.moveY <= 400){
      if(0 < gesture.moveX && gesture.moveX <  133){
        // this.showMenu(4)
        this.props.showMenu(3)
        this.setState({id: 3})
        return 4
      } else if(133 < gesture.moveX && gesture.moveX <  266){
        // this.showMenu(5)
        this.props.showMenu(4)
        this.setState({id: 4})
        return 5
      } else{
        // this.showMenu(6)
        this.props.showMenu(5)
        this.setState({id: 5})
        return 6
      }
    } else if (250 <= gesture.moveY && gesture.moveY <= 550){
      if(0 < gesture.moveX && gesture.moveX <  133){
        // this.showMenu(7)
        this.props.showMenu(6)
        this.setState({id: 6})
        return 7
      } else if(133 < gesture.moveX && gesture.moveX <  266){
        // this.showMenu(8)
        this.props.showMenu(7)
        this.setState({id: 7})
        return 8
      } else{
        // this.showMenu(9)
        this.props.showMenu(8)  
        this.setState({id: 8})
        return 9      
      }
    }
    if(266 < gesture.moveX && gesture.moveX <  400 && 650 <= gesture.moveY && gesture.moveY <= 750){
      this.props.showBill(this.state.id)
      return 10
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