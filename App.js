import React, { Component } from "react";
import { Animated, View, StyleSheet, PanResponder, Text, FlatList, TouchableOpacity, Image } from "react-native";

import Modal from 'react-native-modal';
import Table from './images/chair.png';
import Menu from './Menu.json'
import Drag from './Draggable'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DATA : [
        {
          id: 0,
          order: [0,0,0,0,0,0,0],
          total: 0,
          activated: false,
    
        },
        {
          id: 1,
          order: [0,0,0,0,0,0,0],
          total: 0,
          activated: false
        },
        {
          id: 2,
          order: [0,0,0,0,0,0,0],
          total: 0,
          activated: false
        },
        {
          id: 3,
          order: [0,0,0,0,0,0,0],
          total: 0,
          activated: false
        },
        {
          id: 4,
          order: [0,0,0,0,0,0,0],
          total: 0,
          activated: false
        },
        {
          id: 5,
          order: [0,0,0,0,0,0,0],
          total: 0,
          activated: false
        },
        {
          id: 6,
          order: [0,0,0,0,0,0,0],
          total: 0,
          activated: false
        },
        {
          id: 7,
          order: [0,0,0,0,0,0,0],
          total: 0,
          activated: false
        },
        {
          id: 7,
          order: [0,0,0,0,0,0,0],
          total: 0,
          activated: false
        },
      ],
      showMenu: false,
      idMenu: 0,
    };
    this.showMenu = this.showMenu.bind(this)
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
        this.showMenu(1)
      } else if(133 < gesture.moveX && gesture.moveX <  266){
        this.showMenu(2)
      } else{
        this.showMenu(3)
      }
    } else if (250 <= gesture.moveY && gesture.moveY <= 400){
      if(0 < gesture.moveX && gesture.moveX <  133){
        this.showMenu(4)
      } else if(133 < gesture.moveX && gesture.moveX <  266){
        this.showMenu(5)
      } else{
        this.showMenu(6)
      }
    } else if (250 <= gesture.moveY && gesture.moveY <= 550){
      if(0 < gesture.moveX && gesture.moveX <  133){
        this.showMenu(7)
      } else if(133 < gesture.moveX && gesture.moveX <  266){
        this.showMenu(8)
      } else{
        this.showMenu(9)
      }
    }
  }


  showMenu = (id) => {
    this.setState({showMenu: true, idMenu: id})
    for( let i = 0; i<this.state.DATA.length ; i++){
      if(this.state.DATA[i].id == id){
        let temp = this.state.DATA
        temp[i].activated = true;
        this.setState({DATA: temp})
      }
    }
  }
  hideMenu = () => {
    this.setState({showMenu: false})
  }
  addOrder = (id, index) => {
    let temp = this.state.DATA
    temp[id].order[index] += 1
    temp[id].total += 1
     this.setState({DATA: temp})
  }
  removeOrder = (id, index) => {
    let temp = this.state.DATA
    temp[id].order[index] -= 1
    temp[id].total -= 1
    this.setState({DATA: temp})
  }
  render() {
    console.log(this.state.DATA)
    return (
      <View style={styles.container}>
        <View style={{marginTop: 20, height: 80}}>
          <Text style={{marginTop: 30,fontSize: 30, fontWeight: 'bold', color: 'pink', textAlign:'center'}}>Coffee Shop</Text>
        </View>
        <FlatList
          scrollEnabled={false}
          data={this.state.DATA}
          numColumns={3}
          renderItem={ ({ item }) => (
            <View
            style={{flex: 1, backgroundColor: 'pink', height: 150, justifyContent: 'center', alignItems: 'center'}}
            >
              <Text>{item.total}</Text>
              <Image source={Table} style={{height: 60, width: 60}}></Image>
              <Text>Ban {item.id+1}</Text>
            </View>
          )}
          keyExtractor={item => item.id}
        >
        </FlatList>
        <View style={{height: 60, width: 60, marginBottom: 200}}>
        <Drag showMenu={this.showMenu}/>
        <Drag showMenu={this.showMenu}/>
        <Drag showMenu={this.showMenu}/>
        <Drag showMenu={this.showMenu}/>
        <Drag showMenu={this.showMenu}/>
        <Drag showMenu={this.showMenu}/>
        <Drag showMenu={this.showMenu}/>
        <Drag showMenu={this.showMenu}/>
        <Drag showMenu={this.showMenu}/>
        </View>
        { this.state.DATA[this.state.idMenu].activated ? (
          <Modal isVisible={this.state.showMenu} onBackdropPress={this.hideMenu}>
          <View style={{backgroundColor: '#fff', width: '100%'}}>
            <Text>Ban so {this.state.idMenu +1}</Text>
          <FlatList
            scrollEnabled={false}
            data={Menu.Menu}
            numColumns={3}
            renderItem={ ({ item, index }) => (
              <TouchableOpacity style={{flex: 1, height: 150, justifyContent: 'center', alignItems: 'center'}} onPress={() => this.addOrder(this.state.idMenu, index)} onLongPress={() => this.removeOrder(this.state.idMenu, index)}>
                <Text>{this.state.DATA[this.state.idMenu].order[index]}</Text>
                <Text>{item.name}</Text>
                {/* <Image source={require('./images/Beer.jpg')} style={{height: 80, width: 80}}></Image> */}
                <Image source={{uri: item.img}} style={{height: 80, width: 80}}></Image>
                <Text>{item.price}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
          >
          </FlatList>
          </View>r
        </Modal>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "bold"
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: "blue",
    borderRadius: 5
  }
});

export default App;