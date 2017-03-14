import React, {Component} from 'react';
import {Text, View, TouchableOpacity } from 'react-native';
import Icon from 'FinanceBakerZ/src/icons/CustomIcons';
import {DrawerItemsStyles} from 'FinanceBakerZ/src/components/drawerItems/DrawerItemsStyles';


export default class DrawerItems extends Component {

  render(){

    const {routes} = this.props.navigation.state;
    const {state} = this.props.navigation;
    const { navigate } = this.props.navigation;
    const Icons = ['ic_dashboard_black_48px', 'ic_timeline_black_48px', 'ic_monetization_on_black_48px', 'ic_account_balance_black_48px', 'ic_view_module_black_48px', 'ic_settings_black_48px'];

    return(
      <View style={DrawerItemsStyles.container}>
        {routes.map((route, index) => {
          return(
            <TouchableOpacity key={index} style={[DrawerItemsStyles.item, {backgroundColor: state.index == index ? '#00562f' : 'white'}]} onPress={() => navigate(route.routeName)} activeOpacity={0.6}>
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