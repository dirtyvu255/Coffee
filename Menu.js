import React, { Component } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";

import Modal from 'react-native-modal';
import Menu from './Menu.json'

export default class Menu extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <Modal isVisible={this.state.showMenu}>
                {/* <TouchableOpacity onPress={this.hideMenu()}>
                    <Text>Close</Text>
                    </TouchableOpacity> */}
                <View style={{backgroundColor: '#fff', width: '100%'}}>
                    <Text>Ban so {this.state.idMenu}</Text>
                <FlatList
                    scrollEnabled={false}
                    data={Menu.Menu}
                    numColumns={3}
                    renderItem={ ({ item, index }) => (
                    <TouchableOpacity style={{flex: 1, height: 150, justifyContent: 'center', alignItems: 'center'}} onPress={this.addOrder(this.state.idMenu, index)} onLongPress={this.removeOrder(this.state.idMenu, index)}>
                        <Text>{this.state.DATA[this.state.idMenu].order[index]}</Text>
                        <Text>{item.name}</Text>
                        {/* <Text>{item.img}</Text> */}
                        <Image source={require('./images/Beer.jpg')} style={{height: 80, width: 80}}></Image>
                        <Text>{item.price}</Text>
                    </TouchableOpacity>
                    )}
                    keyExtractor={item => item.id}
                >
                </FlatList>
                </View>
            </Modal>
        )
    }
}