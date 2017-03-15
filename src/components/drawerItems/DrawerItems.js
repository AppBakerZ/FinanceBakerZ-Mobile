import React, {Component} from 'react';
import {Text, View, ScrollView, ListView, TouchableOpacity } from 'react-native';
import Icon from 'FinanceBakerZ/src/icons/CustomIcons';
import {DrawerItemsStyles} from 'FinanceBakerZ/src/components/drawerItems/DrawerItemsStyles';

let Icons = [];

import Meteor from 'react-native-meteor';


export default class DrawerItems extends Component {

  logout(){
    Meteor.logout();
  }

  render(){

    const {routes} = this.props.navigation.state;
    const {state} = this.props.navigation;
    const { navigate } = this.props.navigation;
    this.logout = this.logout.bind(this);

    return(
      <View style={DrawerItemsStyles.container}>
        {routes.map((route, index) => {
          return(
            <TouchableOpacity key={index} style={[DrawerItemsStyles.item, {backgroundColor: state.index == index ? '#00562f' : 'white'}]} onPress={() => {(route.routeName === 'Logout' ? this.logout() : navigate(route.routeName))}  } activeOpacity={0.6}>
              <Icon style={DrawerItemsStyles.icon} color={state.index == index ? 'white' : 'black' } name={Icons[index]} size={28}></Icon>
              <Text style={[DrawerItemsStyles.drawerText, {color: state.index == index ? 'white' : 'black'}]}>{route.routeName.toUpperCase()}</Text>
            </TouchableOpacity>
          )
        })}
        <View style={DrawerItemsStyles.bottomContainer}>

        </View>
      </View>
    )
  }
}

export const DrawerItemIcon = (iconName) => {
  Icons.push(iconName);
};