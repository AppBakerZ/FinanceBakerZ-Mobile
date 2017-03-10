
import LoginScreen from 'FinanceBakerZ/src/screens/auth/Login';
import RegisterScreen from 'FinanceBakerZ/src/screens/auth/Register';
import ForgotPasswordScreen from 'FinanceBakerZ/src/screens/auth/ForgotPassword';
import Meteor from 'react-native-meteor';

Meteor.connect('ws://development-financebakerz.herokuapp.com/websocket');



import {
    StackNavigator,
} from 'react-navigation';

export default StackNavigator({
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