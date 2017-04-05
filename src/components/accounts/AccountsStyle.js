import {StyleSheet} from 'react-native';

export const AccountsStyles = StyleSheet.create({
    box: {
        height: 150,
        marginTop: 20,
        marginLeft: 20,
        marginRight:20,
        borderColor: '#cdcdcd',
        borderWidth: 1,
        flexDirection: 'row',
    },
    imgBox: {
        flex: 1,

    },
    detailBox: {
        flex: 1
    },

    accNo: {
        fontFamily: 'QuicksandBold-Regular',
    },
    amount: {

        fontSize: 15,
        fontFamily: 'QuicksandBold-Regular',
    },
    card: {
        padding : 15,
        marginTop: 15,
        marginLeft: 25,
        marginRight: 25,
        flexDirection: 'row',

    },
    text: {
        fontFamily: 'QuicksandBook-Regular'
    },
    scroll:{
        flex :1
    },


});