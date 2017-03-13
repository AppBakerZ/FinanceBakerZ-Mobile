import React, { Component } from 'react';
import {Button, Image, Text} from 'react-native';


import LoginScreen from 'FinanceBakerZ/src/screens/auth/Login';
import RegisterScreen from 'FinanceBakerZ/src/screens/auth/Register';
import ForgotPasswordScreen from 'FinanceBakerZ/src/screens/auth/ForgotPassword';

import DashboardScreen from 'FinanceBakerZ/src/screens/Dashboard';
import ProjectsScreen from 'FinanceBakerZ/src/screens/Projects';
import TransactionsScreen from 'FinanceBakerZ/src/screens/Transactions';
import AccountsScreen from 'FinanceBakerZ/src/screens/Accounts';
import CategoriesScreen from 'FinanceBakerZ/src/screens/Categories';
import SettingsScreen from 'FinanceBakerZ/src/screens/Settings';
import Icon from 'FinanceBakerZ/src/icons/CustomIcons';
import {drawer} from 'FinanceBakerZ/src/components/drawerItems/DrawerItems';


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
           style={{marginLeft: 10}}
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

  style = {
    height: 70
  };

  return { left, right, style};
};


const DashboardStack = StackNavigator({
  Dashboard: {
    screen: DashboardScreen,
    navigationOptions: {
      header: header,
      drawer: drawer('DASHBOARD', 'ic_dashboard_black_48px')
    }
  }
});

const ProjectsStack = StackNavigator({
  Projects: {
    screen: ProjectsScreen,
    navigationOptions: {
      header: header,
      drawer: drawer('PROJECTS', 'ic_timeline_black_48px')

    }
  }
});

const TransactionsStack = StackNavigator({
  Transactions: {
    screen: TransactionsScreen,
    navigationOptions: {
      header: header,
      drawer: drawer('TRANSACTIONS', 'ic_monetization_on_black_48px')
    }
  }
});

const AccountsStack = StackNavigator({
  Accounts: {
    screen: AccountsScreen,
    navigationOptions: {
      header: header,
      drawer: drawer('ACCOUNTS', 'ic_account_balance_black_48px')
    }
  }
});

const CategoriesStack = StackNavigator({
  Categories: {
    screen: CategoriesScreen,
    navigationOptions: {
      header: header,
      drawer: drawer('CATEGORIES', 'ic_view_module_black_48px')
    }
  }
});

const SettingsStack = StackNavigator({
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      header: header,
      drawer: drawer('SETTINGS', 'ic_settings_black_48px')
    }
  }
});

//Left Menu that will use Many Stack
export const Drawer = DrawerNavigator({
  Dashboard: {
    screen: DashboardStack
  },
  Projects: {
    screen: ProjectsStack
  },
  Transactions: {
    screen: TransactionsStack
  },
  Accounts: {
    screen: AccountsStack
  },
  Categories: {
    screen: CategoriesStack
  },
  Settings: {
    screen: SettingsStack
  }
}, {
  contentOptions: {
    activeBackgroundColor : '#00562f',
    activeTintColor: '#fff',
    inactiveTintColor: '#000'
  }
});