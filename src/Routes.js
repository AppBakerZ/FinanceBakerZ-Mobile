import React, { Component } from 'react';
import {Button, Image, Text, View} from 'react-native';


import LoginScreen from 'FinanceBakerZ/src/screens/auth/Login';
import RegisterScreen from 'FinanceBakerZ/src/screens/auth/Register';
import ForgotPasswordScreen from 'FinanceBakerZ/src/screens/auth/ForgotPassword';

import DashboardScreen, {DashboardTabNavigator} from 'FinanceBakerZ/src/screens/Dashboard';
import DashboardSelection  from 'FinanceBakerZ/src/components/dashboard/dashboardSelection/DashboardSelection';
import ProjectsScreen from 'FinanceBakerZ/src/screens/Projects';
import TransactionsScreen from 'FinanceBakerZ/src/screens/Transactions';
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

//Only for Auth Components
const authHeader = ({ state, goBack }) => {
  // The navigation prop has functions like setParams, goBack, and navigate.
  let left = (
      <Icon  name="back"
             size={32}
             style={{marginLeft: 5, padding: 10}}
             onPress={() => {
               goBack()
                }}
          />
  );

  let title = (
      <Text style={{fontSize: 20, fontFamily: 'QuicksandBold-Regular', color: '#00562E'}}>{(state.routeName != 'Dashboard') ? state.routeName : ''}</Text>
  );


  style = {
    height: 70,
    backgroundColor: '#ffffff'
  };

  return { left, title, style};
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
    navigationOptions: {
      title: 'Sign Up',
      header: authHeader
    }
  },
  ForgotPassword: {
    screen: ForgotPasswordScreen,
    navigationOptions: {
      title: 'Forgot Password',
      header: authHeader
    }
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
    <Text style={{fontSize: 20, fontFamily: 'QuicksandBold-Regular', color: '#00562E', paddingLeft: 15}}>{(state.routeName != 'Dashboard') ? state.routeName : ''}</Text>
  );

  style = {
    height: 70,
    backgroundColor: '#ffffff'
  };

  return { left, title, style};
};

const goBackHeader  = ({ goBack }) => {
  // The navigation prop has functions like setParams, goBack, and navigate.
  let left = (
    <Icon  name="back"
           size={32}
           color={'#00562E'}
           style={{marginLeft: 5, padding: 10}}
           onPress={() => {
               goBack()
                }}
    />
  );

  let title = (
    <Text style={{fontSize: 20, fontFamily: 'QuicksandBold-Regular', color: '#00562E', paddingLeft: 15}}>Categories</Text>
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
  }
}, {
  mode: 'modal'
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
      header: goBackHeader,
    }
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
    navigationOptions: {
      title: 'Change Password'
    }
  },
  AccountSettings: {
    screen: AccountSettingsScreen,
    navigationOptions: {
      title: 'Account Settings'
    }
  },
  PersonalInformation: {
    screen: PersonalInformationScreen,
    navigationOptions: {
      title: 'Personal Information'
    }
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