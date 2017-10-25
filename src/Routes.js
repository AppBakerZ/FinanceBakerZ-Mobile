import React from 'react';
import {Text, Platform, TouchableOpacity, Image} from 'react-native';


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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DrawerItems, {DrawerItemIcon} from 'FinanceBakerZ/src/components/drawerItems/DrawerItems';
import { StackNavigator, DrawerNavigator } from 'react-navigation';


export const Auth = StackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      title: 'Login',
      header: null
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
const header = ({ navigation, screenProps }) => {
  let {state, navigate} = navigation;
  let headerLeft  = (
      <TouchableOpacity onPress={() => navigate('DrawerOpen')} activeOpacity={0.7}>
        <MaterialIcons name="menu" size={32} color='#45A27A' style={{marginLeft: 5, padding: 10}}/>
      </TouchableOpacity>
  );

  let headerTitle  = (
      <Text style={{fontSize: 20, fontFamily: 'QuicksandBold-Regular', color: '#00562E', paddingLeft: 20}}>{state.routeName}</Text>
  );

  let { user } = screenProps;
  let headerRight = (
      <TouchableOpacity
          style={{width: 45, height: 45, marginRight: 10}}
          activeOpacity={0.7}
          onPress={() => {navigate('Settings')}}
      >
        <Image style={{width: '100%', height: '100%', borderRadius: Platform.OS === 'ios' ? 25 : 100}}
               source={user.profile.avatar.length ? {uri: user.profile.avatar} : require('./images/default-avatar.gif')}/>
      </TouchableOpacity>
  );

  let  headerStyle  = {
    height: 60,
    backgroundColor: '#ffffff'
  };

  return { headerLeft , headerTitle , headerStyle, headerRight };
};

function nestingHeaders(routeName, renderRightIcon) {

  let header = ({navigation, screenProps}) => {
    let headerRight ;
    let {state, navigate} = navigation;
    if(renderRightIcon && renderRightIcon.iconChecked){
      headerRight  =  (<MaterialIcons name="check" size={30} style={{paddingRight: 15}} onPress={() => {state.params.submit()}}/>);
    } else if (renderRightIcon && renderRightIcon.iconDelete) {
      headerRight  =  (<MaterialIcons
          name="delete"
          size={35}
          style={{paddingRight: 15}}
          onPress={() => {state.params.submit()}}
      />);
    } else if (renderRightIcon && renderRightIcon.userAvatar) {
      let { user } = screenProps;
      headerRight = (
          <TouchableOpacity
              style={{width: 40, height: 40, marginRight: 10}}
              activeOpacity={0.7}
              onPress={() => {navigate('Settings')}}
          >
            <Image style={{width: '100%', height: '100%', borderRadius: Platform.OS === 'ios' ? 25 : 100}}
                   source={user.profile.avatar.length ? {uri: user.profile.avatar} : require('./images/default-avatar.gif')}/>
          </TouchableOpacity>
      );
    }
    return {
      title: (state.params && state.params.myTitle) || routeName,
      headerRight,
      headerTitleStyle: {
        fontWeight: Platform.OS === 'ios' ? '500' : '200',
        fontFamily: 'QuicksandBold-Regular',
        fontSize: 20
      },
      headerStyle: {
        height: 60,
        backgroundColor: '#fff'
      },
      headerTintColor: '#00562E'
    }
  };
  return header
}


const DashboardStack = StackNavigator({
  Dashboard: {
    screen: DashboardScreen,
    navigationOptions: header
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
    navigationOptions: header
  },
  CreateProject: {
    screen: CreateProject,
    navigationOptions: nestingHeaders('Create Project', {userAvatar: true})
  },
  DetailProject:{
    screen: DetailProject,
    navigationOptions: nestingHeaders('Detail Project', {iconDelete: true})
  },
  UpdateProject: {
    screen: UpdateProject,
    navigationOptions: nestingHeaders('Update Project', {userAvatar: true})
  },
  ProjectSelection: {
    screen: ProjectSelectionScreen,
    navigationOptions: nestingHeaders('Selection', {iconChecked: true})
  }
});

const TransactionsStack = StackNavigator({
  Transactions: {
    screen: TransactionsScreen,
    navigationOptions: header

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
    navigationOptions: nestingHeaders('Transaction', {userAvatar: true})
  }
});

const AccountsStack = StackNavigator({
  Accounts: {
    screen: AccountsScreen,
    navigationOptions: header
  },
  AddAccount: {
    screen: AddAccount,
    navigationOptions: nestingHeaders('Add Account', {userAvatar: true})
  },
  UpdateAccount:{
    screen: UpdateAccount,
    navigationOptions: nestingHeaders('Update Account',  {iconDelete: true})
  }
});

const CategoriesStack = StackNavigator({
  Categories: {
    screen: CategoriesScreen,
    navigationOptions: header
  },
  SubCategories: {
    screen: SubCategory,
    navigationOptions: nestingHeaders('Categories', {userAvatar: true})
  },
  UpdateCategory: {
    screen: UpdateCategory,
    navigationOptions: nestingHeaders('Update Category', {iconDelete: true})
  },
  AddCategory : {
    screen : AddCategory,
    navigationOptions : nestingHeaders('Add Category', {userAvatar: true})
  }
});

const SettingsStack = StackNavigator({
  Settings: {
    screen: SettingsScreen,
    navigationOptions: header
  },
  ChangePassword: {
    screen: ChangePasswordScreen,
    navigationOptions: nestingHeaders('Change Password', {userAvatar: true})
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
