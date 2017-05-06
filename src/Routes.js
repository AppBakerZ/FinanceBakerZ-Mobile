import React from 'react';
import {Text, Platform} from 'react-native';


import LoginScreen from 'FinanceBakerZ/src/screens/auth/Login';
import RegisterScreen from 'FinanceBakerZ/src/screens/auth/Register';
import ForgotPasswordScreen from 'FinanceBakerZ/src/screens/auth/ForgotPassword';

import DashboardScreen, {DashboardTabNavigator} from 'FinanceBakerZ/src/screens/Dashboard';
import DashboardSelection  from 'FinanceBakerZ/src/components/dashboard/dashboardSelection/DashboardSelection';
import ProjectsScreen from 'FinanceBakerZ/src/screens/Projects';
import DetailProject from 'FinanceBakerZ/src/components/projects/projectSelection/DetailProject';
import ProjectSelectionScreen from 'FinanceBakerZ/src/components/projects/projectSelection/ProjectSelection';
import CreateProject from 'FinanceBakerZ/src/components/projects/CreateProject';
import UpdateProject from 'FinanceBakerZ/src/components/projects/UpdateProject';
import TransactionsScreen from 'FinanceBakerZ/src/screens/Transactions';
import TransactionSelection from 'FinanceBakerZ/src/components/transactions/transactionSelection/TransactionSelection';
import ViewTransaction from 'FinanceBakerZ/src/components/transactions/ViewTransaction';
import AddOrUpdateTransaction from 'FinanceBakerZ/src/components/transactions/AddOrUpdateTransaction';
import AccountsScreen from 'FinanceBakerZ/src/screens/Accounts';
import AddAccount from 'FinanceBakerZ/src/components/accounts/AddAccount';
import UpdateAccount from 'FinanceBakerZ/src/components/accounts/UpdateAccount';
import CategoriesScreen from 'FinanceBakerZ/src/screens/Categories';
import SubCategory from 'FinanceBakerZ/src/components/categories/subCategory/SubCategory';
import UpdateCategory from 'FinanceBakerZ/src/components/categories/UpdateCategory';
import AddCategory from 'FinanceBakerZ/src/components/categories/subCategory/AddCategory';
import SettingsScreen from 'FinanceBakerZ/src/screens/Settings';
import ChangePasswordScreen from 'FinanceBakerZ/src/components/settings/changePassword/ChangePassword';
import AccountSettingsScreen from 'FinanceBakerZ/src/components/settings/accountSettings/AccountSettings';
import PersonalInformationScreen from 'FinanceBakerZ/src/components/settings/personalInformation/PersonalInformation';
import Icon from 'FinanceBakerZ/src/icons/CustomIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DrawerItems, {DrawerItemIcon} from 'FinanceBakerZ/src/components/drawerItems/DrawerItems';
import { StackNavigator, DrawerNavigator } from 'react-navigation';


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


// The navigation prop has functions like setParams, goBack, and navigate.
const header = ({ state, navigate }) => {
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

function nestingHeaders(routeName, renderRightIcon) {

  let header = ({state}) => {
    let right;
    if(renderRightIcon && renderRightIcon.iconChecked){
      right =  (<Icon
          name="checked"
          size={28}
          style={{paddingRight: 15}}
          onPress={() => {state.params.submit()}}
      />);
    }else if (renderRightIcon && renderRightIcon.iconDelete) {
      right =  (<Ionicons
          name="ios-trash"
          size={35}
          style={{paddingRight: 15, color: '#c71212'}}
          onPress={() => {state.params.submit()}}
      />);
    }
    return {
      title: (state.params && state.params.myTitle) || routeName,
      right,
      titleStyle: {
        fontWeight: Platform.OS === 'ios' ? '500' : '200',
        fontFamily: 'QuicksandBold-Regular',
        fontSize: 20
      },
      style: {
        height: 70,
        backgroundColor: '#fff'
      },
      tintColor: '#00562E'
    }
  };
  return {
    header
  }
}


const DashboardStack = StackNavigator({
  Dashboard: {
    screen: DashboardScreen,
    navigationOptions: {
      header: header
    }
  },
  Selection: {
    screen: DashboardSelection,
    navigationOptions: nestingHeaders('Selection', {iconChecked: true})
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
  },
  CreateProject: {
    screen: CreateProject,
    navigationOptions: nestingHeaders('Create Project')
  },
  DetailProject:{
    screen: DetailProject,
    navigationOptions: nestingHeaders('Detail Project', {iconDelete: true})
  },
  UpdateProject: {
    screen: UpdateProject,
    navigationOptions: nestingHeaders('Update Project')
  },
  ProjectSelection: {
    screen: ProjectSelectionScreen,
    navigationOptions: nestingHeaders('Selection', {iconChecked: true})
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
    navigationOptions: nestingHeaders('Selection', {iconChecked: true})
  },
  ViewTransaction: {
    screen: ViewTransaction,
    navigationOptions: nestingHeaders('Transactions', {iconDelete: true})
  },
  UpdateTransaction: {
    screen: AddOrUpdateTransaction,
    navigationOptions: nestingHeaders('Transaction')
  }
});

const AccountsStack = StackNavigator({
  Accounts: {
    screen: AccountsScreen,
    navigationOptions: {
      header: header
    }
  },
  AddAccount: {
    screen: AddAccount,
    navigationOptions: nestingHeaders('Add Account')
  },
  UpdateAccount:{
    screen: UpdateAccount,
    navigationOptions: nestingHeaders('Update Account',  {iconDelete: true})
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
    screen: SubCategory,
    navigationOptions: nestingHeaders('Categories')
  },
  UpdateCategory: {
    screen: UpdateCategory,
    navigationOptions: nestingHeaders('Update Category', {iconDelete: true})
  },
  AddCategory : {
    screen : AddCategory,
    navigationOptions : nestingHeaders('Add Category')
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
    navigationOptions: nestingHeaders('Personal Info')
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
