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
import DrawerItems from 'FinanceBakerZ/src/components/drawerItems/DrawerItems';


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

  style = {
    height: 70
  };

  return { left, right, style};
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
  contentComponent: DrawerItems
});