import LoginScreen from 'FinanceBakerZ/src/screens/auth/Login';
import RegisterScreen from 'FinanceBakerZ/src/screens/auth/Register';
import ForgotPasswordScreen from 'FinanceBakerZ/src/screens/auth/ForgotPassword';

import DashboardScreen from 'FinanceBakerZ/src/screens/Dashboard';

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

const DashboardStack = StackNavigator({
    Dashboard: {
        screen: DashboardScreen,
        navigationOptions: {
            title: 'Dashboard'
        }
    }
}, {
    initialRouteName: 'Dashboard'
});

//Left Menu that will use Many Stack
export const Drawer = DrawerNavigator({
    Dashboard: {
        screen: DashboardStack
    }
}, {
    contentOptions: {
        activeTintColor: '#e91e63'
    }
});