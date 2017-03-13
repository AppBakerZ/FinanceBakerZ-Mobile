import React from 'react';
import {Text} from 'react-native';
import Icon from 'FinanceBakerZ/src/icons/CustomIcons';
import {DrawerItemsStyles} from 'FinanceBakerZ/src/components/drawerItems/DrawerItemsStyles';

exports.drawer = (labelText, iconName) => {

  let label = (tintColor ) => {
    return (<Text style={[{color: tintColor.tintColor}, DrawerItemsStyles.drawerText]}>{labelText}</Text>);
  };
  let icon = (tintColor) => {
    return(<Icon  color={tintColor.tintColor} size={25} name={iconName} />);
  };



  return{icon, label};
};