import React, { Component } from 'react';
import {Button, Image, Text, View} from 'react-native';


import LoginScreen from 'FinanceBakerZ/src/screens/auth/Login';
import RegisterScreen from 'FinanceBakerZ/src/screens/auth/Register';
import ForgotPasswordScreen from 'FinanceBakerZ/src/screens/auth/ForgotPassword';

import DashboardScreen, {DashboardTabNavigator} from 'FinanceBakerZ/src/screens/Dashboard';
import DashboardSelection  from 'FinanceBakerZ/src/components/dashboard/dashboardSelection/DashboardSelection';
import ProjectsScreen from 'FinanceBakerZ/src/screens/Projects';
import ProjectSelectionScreen from 'FinanceBakerZ/src/components/projects/projectSelection/ProjectSelection';
import TransactionsScreen from 'FinanceBakerZ/src/screens/Transactions';
import TransactionSelection from 'FinanceBakerZ/src/components/transactions/transactionSelection/TransactionSelection';
import AccountsScreen from 'FinanceBakerZ/src/screens/Accounts';
import CategoriesScreen from 'FinanceBakerZ/src/screens/Categories';
import SubCategoriesScreen from 'FinanceBakerZ/src/components/categories/subCategory/SubCategory';
import SettingsScreen from 'FinanceBakerZ/src/screens/Settings';
import ChangePasswordScreen from 'FinanceBakerZ/src/components/settings/changePassword/ChangePassword';
import AccountSettingsScreen from 'FinanceBakerZ/src/components/settings/accountSettings/AccountSettings';
import PersonalInformationScreen from 'FinanceBakerZ/src/components/settings/personalInformation/PersonalInformation';
import Icon from 'FinanceBakerZ/src/icons/CustomIcons';
import DrawerItems, {DrawerItemIcon} from 'FinanceBakerZ/src/components/drawerItems/DrawerItems';


import { StackNavigator, DrawerNavigator } from 'react-navigation';


let nestingHeaders  = (routeName) => {
  return {
    title: routeName,
    header: {
      titleStyle: {
        fontWeight: '200',
        fontFamily: 'QuicksandBold-Regular',
        fontSize: 20
      },
      style: {
        height: 70
      },
      tintColor: '#00562E'
    }
  }
};

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
  Register: {
    screen: RegisterScreen,
    navigationOptions: nestingHeaders('Sign Up')
  },
  ForgotPassword: {
    screen: ForgotPasswordScreen,
    navigationOptions: nestingHeaders('Forgot Password')

  }
}, {
  headerMode: 'screen'
});


const header = ({ state, navigate }) => {
  // The navigation prop has functions like setParams, goBack, and navigate.
  let left = (
    <Icon  name="menu"
           color="#45A27A"
           size={32}
           style={{marginLeft: 5, padding: 10}}
           onPress={() => {
               navigate('DrawerOpen')
                }}
    />
  );

  let title = (
    <Text style={{fontSize: 20, fontFamily: 'QuicksandBold-Regular', color: '#00562E', paddingLeft: 20}}>{(state.routeName != 'Dashboard') ? state.routeName : ''}</Text>
  );

  style = {
    height: 70,
    backgroundColor: '#ffffff'
  };

  return { left, title, style};
};

const DashboardStack = StackNavigator({
  Dashboard: {
    screen: DashboardScreen,
    navigationOptions: {
      header: header
    }
  },
  Selection: {
    screen: DashboardSelection,
    navigationOptions: {
    }
  },
}, {
  mode: 'modal'
});

const ProjectsStack = StackNavigator({
    Projects: {
        screen: ProjectsScreen,
        navigationOptions: {
            header: header
        }
    },
    ProjectSelection: {
        screen: ProjectSelectionScreen,
        navigationOptions: nestingHeaders('Selection'),
    }
});

const TransactionsStack = StackNavigator({
  Transactions: {
    screen: TransactionsScreen,
    navigationOptions: {
      header: header
    }
  },
  Selection: {
    screen: TransactionSelection,
    navigationOptions: nestingHeaders('Selection')
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
    navigationOptions: nestingHeaders('Categories')
  }


});

const SettingsStack = StackNavigator({
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      header: header
    }
  },
  ChangePassword: {
    screen: ChangePasswordScreen,
    navigationOptions: nestingHeaders('Change Password')
  },
  AccountSettings: {
    screen: AccountSettingsScreen,
    navigationOptions: nestingHeaders('Account Settings')
  },
  PersonalInformation: {
    screen: PersonalInformationScreen,
    navigationOptions: nestingHeaders('Personal Information')
  }
});

//Left Menu that will use Many Stack
export const Drawer = DrawerNavigator({
  Dashboard: {
    screen: DashboardStack,
    drawer: DrawerItemIcon('dashboard')
  },
  Projects: {
    screen: ProjectsStack,
    drawer: DrawerItemIcon('project')
  },
  Transactions: {
    screen: TransactionsStack,
    drawer: DrawerItemIcon('transaction')
  },
  Accounts: {
    screen: AccountsStack,
    drawer: DrawerItemIcon('bank')
  },
  Categories: {
    screen: CategoriesStack,
    drawer: DrawerItemIcon('category')
  },
  Settings: {
    screen: SettingsStack,
    drawer: DrawerItemIcon('setting')
  },
  Logout: {
    screen: SettingsStack,
    drawer: DrawerItemIcon('sign-in')
  }
}, {
  contentComponent: DrawerItems
});