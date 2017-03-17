import React, { Component } from 'react';
import {Button, Image, Text, View} from 'react-native';


import LoginScreen from 'FinanceBakerZ/src/screens/auth/Login';
import RegisterScreen from 'FinanceBakerZ/src/screens/auth/Register';
import ForgotPasswordScreen from 'FinanceBakerZ/src/screens/auth/ForgotPassword';

import DashboardScreen, {DashboardTabNavigator} from 'FinanceBakerZ/src/screens/Dashboard';
import ProjectsScreen from 'FinanceBakerZ/src/screens/Projects';
import TransactionsScreen from 'FinanceBakerZ/src/screens/Transactions';
import AccountsScreen from 'FinanceBakerZ/src/screens/Accounts';
import CategoriesScreen from 'FinanceBakerZ/src/screens/Categories';
import SubCategoriesScreen from 'FinanceBakerZ/src/components/categories/subCategory/SubCategory';
import SettingsScreen from 'FinanceBakerZ/src/screens/Settings';
import Icon from 'FinanceBakerZ/src/icons/CustomIcons';
import DrawerItems, {DrawerItemIcon} from 'FinanceBakerZ/src/components/drawerItems/DrawerItems';


import { StackNavigator, DrawerNavigator } from 'react-navigation';

//Only for Auth Components
export const Auth = StackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      title: 'Login',
      header: {
        visible: false
      }
    }
  },
  Register: {screen: RegisterScreen},
  ForgotPassword: {screen: ForgotPasswordScreen}
}, {
  headerMode: 'screen'
});


const header = ({ state, navigate }) => {
  // The navigation prop has functions like setParams, goBack, and navigate.
  let left = (
    <Icon  name="menu-options"
           size={32}
           color="#00562f"
           style={{marginLeft: 5, padding: 10}}
           onPress={() => {
               navigate('DrawerOpen')
                }}
    />
  );

  let right = (
    <Image style={{marginRight: 5, height: 50,
    borderRadius: 50,
    width: 50}} source={{uri: 'http://placehold.it/100x100'}}/>
  );

  let title = (
    <Text style={{fontSize: 20, fontFamily: 'QuicksandBold-Regular', color: '#00562E'}}>{(state.routeName != 'Dashboard') ? state.routeName : ''}</Text>
  );


  style = {
    height: 70
  };

  return { left, right, title, style};
};


const DashboardStack = StackNavigator({
  Dashboard: {
    screen: DashboardScreen,
    navigationOptions: {
      header: header
    }
  }
});

const ProjectsStack = StackNavigator({
  Projects: {
    screen: ProjectsScreen,
    navigationOptions: {
      header: header
    }
  }
});

const TransactionsStack = StackNavigator({
  Transactions: {
    screen: TransactionsScreen,
    navigationOptions: {
      header: header
    }
  }
});

const AccountsStack = StackNavigator({
  Accounts: {
    screen: AccountsScreen,
    navigationOptions: {
      header: header
    }
  }
});

const CategoriesStack = StackNavigator({
  Categories: {
    screen: CategoriesScreen,
    navigationOptions: {
      header: header
    }
  },
  SubCategories: {
    screen: SubCategoriesScreen,
    navigationOptions: {
      header: header
    }
  }

});

const SettingsStack = StackNavigator({
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      header: header
    }
  }
});

//Left Menu that will use Many Stack
export const Drawer = DrawerNavigator({
  Dashboard: {
    screen: DashboardStack,
    drawer: DrawerItemIcon('ic_dashboard_black_48px')
  },
  Projects: {
    screen: ProjectsStack,
    drawer: DrawerItemIcon('ic_timeline_black_48px')
  },
  Transactions: {
    screen: TransactionsStack,
    drawer: DrawerItemIcon('ic_monetization_on_black_48px')
  },
  Accounts: {
    screen: AccountsStack,
    drawer: DrawerItemIcon('ic_account_balance_black_48px')
  },
  Categories: {
    screen: CategoriesStack,
    drawer: DrawerItemIcon('ic_view_module_black_48px')
  },
  Settings: {
    screen: SettingsStack,
    drawer: DrawerItemIcon('ic_settings_black_48px')
  },
  Logout: {
    screen: SettingsStack,
    drawer: DrawerItemIcon('ic_power_settings_new_black_48px')
  }
}, {
  contentComponent: DrawerItems
});