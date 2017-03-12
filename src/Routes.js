import React, { Component } from 'react';
import {Button} from 'react-native';

import LoginScreen from 'FinanceBakerZ/src/screens/auth/Login';
import RegisterScreen from 'FinanceBakerZ/src/screens/auth/Register';
import ForgotPasswordScreen from 'FinanceBakerZ/src/screens/auth/ForgotPassword';

import DashboardScreen from 'FinanceBakerZ/src/screens/Dashboard';
import ProjectsScreen from 'FinanceBakerZ/src/screens/Projects';
import TransactionsScreen from 'FinanceBakerZ/src/screens/Transactions';
import AccountsScreen from 'FinanceBakerZ/src/screens/Accounts';
import CategoriesScreen from 'FinanceBakerZ/src/screens/Categories';
import SettingsScreen from 'FinanceBakerZ/src/screens/Settings';

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
        <Button
            title="Menu"
            onPress={() => {
               navigate('DrawerOpen')
            }}
        />
    );

    return { left };
};

const DashboardStack = StackNavigator({
    Dashboard: {
        screen: DashboardScreen,
        navigationOptions: {
            title: 'Dashboard',
            header: header
        }
    }
});

const ProjectsStack = StackNavigator({
    Projects: {
        screen: ProjectsScreen,
        navigationOptions: {
            title: 'Projects',
            header: header
        }
    }
});

const TransactionsStack = StackNavigator({
    Transactions: {
        screen: TransactionsScreen,
        navigationOptions: {
            title: 'Transactions',
            header: header
        }
    }
});

const AccountsStack = StackNavigator({
    Accounts: {
        screen: AccountsScreen,
        navigationOptions: {
            title: 'Accounts',
            header: header
        }
    }
});

const CategoriesStack = StackNavigator({
    Categories: {
        screen: CategoriesScreen,
        navigationOptions: {
            title: 'Categories',
            header: header
        }
    }
});

const SettingsStack = StackNavigator({
    Settings: {
        screen: SettingsScreen,
        navigationOptions: {
            title: 'Settings',
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
    contentOptions: {
        activeTintColor: '#e91e63'
    }
});