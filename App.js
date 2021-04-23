import React, { Component } from "react";
import {View, StyleSheet, Text, FlatList, TouchableOpacity, Image, LogBox } from "react-native";

import Modal from 'react-native-modal';
import Table from './images/chair.png';
import Menu from './Menu.json'
import Drag from './Draggable'

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();
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
          id: 8,
          order: [0,0,0,0,0,0,0],
          total: 0,
          activated: false
        },
      ],
      showMenu: false,
      showBill: false,
      idMenu: 0,
      idCheckout: -1,
      total: 0
    };
    this.showMenu = this.showMenu.bind(this)
    this.showBill = this.showBill.bind(this)
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
  hideBill = () => {
    this.setState({showBill: false})
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
  showBill(id) {
    if(id > 0){
      this.setState({showBill: true, idCheckout: id})
    }
  }
  renderBill(order){ 
    let count = 0
    return order.map( (item, index) => {
      if(item > 0){
        count++
        return <View style={{flexDirection: 'row', padding: 20}}>
          <View style={{width: 105}}>
            <Text>{count}. {Menu.Menu[index].name}</Text>
          </View>
          <View style={{width: 140}}>
            <Text style={{textAlign: 'center'}}>{item}</Text>
          </View>
          <View style={{width: 90}}>
            <Text style={{textAlign:'right'}}>{parseInt(Menu.Menu[index].price)*item}</Text>
          </View>
        </View>
      }
    })
  }
  getTotal(order){
    let total = 0;
    order.map( (item,index) =>{
      total += parseInt(Menu.Menu[index].price)*item
    })
    return <Text style={{textAlign: 'center', paddingBottom: 10}}>Total: {total}</Text>
  }

  resetOrder = (id) => {
    let temp = this.state.DATA
    temp[id].order = [0,0,0,0,0,0,0]
    temp[id].activated = false
    temp[id].total = 0
  }
  render() {
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
              <Text>Bàn {item.id+1}</Text>
            </View>
          )}
          keyExtractor={item => item.id}
        >
        </FlatList>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 150}}>
        <View style={{height: 60, width: 60}}>
          <Drag showMenu={this.showMenu} showBill={this.showBill}/>
          <Drag showMenu={this.showMenu} showBill={this.showBill}/>
          <Drag showMenu={this.showMenu} showBill={this.showBill}/>
          <Drag showMenu={this.showMenu} showBill={this.showBill}/>
          <Drag showMenu={this.showMenu} showBill={this.showBill}/>
          <Drag showMenu={this.showMenu} showBill={this.showBill}/>
          <Drag showMenu={this.showMenu} showBill={this.showBill}/>
          <Drag showMenu={this.showMenu} showBill={this.showBill}/>
          <Drag showMenu={this.showMenu} showBill={this.showBill}/>
          <Drag showMenu={this.showMenu} showBill={this.showBill}/>
          <Drag showMenu={this.showMenu} showBill={this.showBill}/>
          <Drag showMenu={this.showMenu} showBill={this.showBill}/>
          <Drag showMenu={this.showMenu} showBill={this.showBill}/>
          <Drag showMenu={this.showMenu} showBill={this.showBill}/>
          <Drag showMenu={this.showMenu} showBill={this.showBill}/>
          <Drag showMenu={this.showMenu} showBill={this.showBill}/>
          <Drag showMenu={this.showMenu} showBill={this.showBill}/>
          <Drag showMenu={this.showMenu} showBill={this.showBill}/>
        </View>
        <View style={{height: 100, width: 100, backgroundColor: 'pink'}}>
          <Text style={{textAlign: 'center'}}>Checkout</Text>
        </View>
        </View>
        { this.state.DATA[this.state.idMenu].activated ? (
          <Modal isVisible={this.state.showMenu} onBackdropPress={this.hideMenu}>
          <View style={{backgroundColor: '#fff', width: '100%', borderRadius: 10}}>
            <Text style={{textAlign: 'center', fontSize: 18, fontWeight: '600', marginTop: 10, color: 'pink'}}>Bàn số {this.state.idMenu +1}</Text>
          <FlatList
            scrollEnabled={false}
            data={Menu.Menu}
            numColumns={3}
            renderItem={ ({ item, index }) => (
              <TouchableOpacity style={{flex: 1, height: 150, justifyContent: 'center', alignItems: 'center'}} onPress={() => this.addOrder(this.state.idMenu, index)} onLongPress={() => this.removeOrder(this.state.idMenu, index)}>
                <Text>{this.state.DATA[this.state.idMenu].order[index]}</Text>
                <Text style={{fontWeight: '500'}}>{item.name}</Text>
                {/* <Image source={require('./images/Beer.jpg')} style={{height: 80, width: 80}}></Image> */}
                <Image source={{uri: item.img}} style={{height: 80, width: 80}}></Image>
                <Text>{item.price}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
          >
          </FlatList>
          </View>
        </Modal>
        ) : null}

        { this.state.showBill? (
          <Modal isVisible={this.state.showBill} onBackdropPress={this.hideBill}>
          <View style={{backgroundColor: '#fff', width: '100%', borderRadius: 10}}>
            <Text style={{textAlign: 'center', fontSize: 18, fontWeight: '600', marginTop: 10, color: 'pink'}}>Bàn số {this.state.idCheckout +1}</Text>
            <View style={{justifyContent: 'space-between', flexDirection: 'row', padding: 20}}>
              <Text>Name</Text>
              <Text>Quantity</Text>
              <Text>Price</Text>
            </View>
            {this.renderBill(this.state.DATA[this.state.idCheckout].order)}
            {this.getTotal(this.state.DATA[this.state.idCheckout].order)}
            {this.resetOrder(this.state.idCheckout)}
          </View>
        </Modal>
        ) : null}
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff"
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