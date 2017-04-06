import {StyleSheet} from 'react-native';

export const AccountSettingsStyle = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        width: null,
        height: null
    },
    inputContainer: {
        flex: 4,
        paddingTop: 30
    },
    btnContainer: {
        flex: 1.8,
        justifyContent: 'flex-end'
    },
    btn: {
        backgroundColor: '#00562f',
        padding: 30
    },
    input: {
        fontFamily: 'QuicksandBook-Regular',
        paddingLeft: 60,
        fontSize: 15,
        height: 48
    },
    inputIcon:{
        position: 'absolute',
        top: 14,
        left: 25
    },
    notificationIcon: {
        marginTop: 12,
        marginLeft: 25,
        marginRight: 15
    },
    notificationText: {
        marginVertical: 14,
        fontFamily: 'QuicksandBook-Regular',
        fontSize: 15
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: '#dadada'
    },

    row: {
        flexDirection: 'row'
    },
    notificationRadio: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    pickerContainer: {
        paddingLeft: 20,
        paddingRight: 20
    }
});