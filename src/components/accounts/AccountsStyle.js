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
        //backgroundColor: '#DCDCDC',
        flex: 1,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 10,
        height: 150,
        paddingTop: 30,
        paddingLeft: 15,

    },
    detailBox: {
        flex: 1.5
    },
    bankName: {
        paddingTop: 15,
        paddingLeft: 10,
        fontSize: 20,
        fontFamily: 'QuicksandBook-Regular',
        paddingBottom: 10,
    },
    accNo: {
        paddingLeft: 10,
        fontSize: 15,
        fontFamily: 'QuicksandBold-Regular',
        paddingBottom: 10,
    },
    amount: {

        fontSize: 15,
        paddingLeft: 10,
        fontFamily: 'QuicksandBold-Regular',
    },
    card: {
        marginTop: 15,
        marginLeft: 25,
        marginRight: 25,
        flexDirection: 'row',
        paddingTop: 5,
        paddingBottom: 5,
    },

    text: {
        fontFamily: 'QuicksandBook-Regular'
    },

    customIcon: {

    }



});