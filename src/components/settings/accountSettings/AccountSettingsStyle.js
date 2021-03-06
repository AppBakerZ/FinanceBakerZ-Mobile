import {StyleSheet, Dimensions} from 'react-native';
let screen = Dimensions.get('window');

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
    notificationIcon: {
        marginTop: 12,
        marginLeft: 25,
        marginRight: 10
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
        flex: 1.5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    radioButton: {
        width: 18,
        height: 18
    },
    pickerContainer: {
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 10
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 200
    },
    modalViewContainer: {
        width: screen.width,
        paddingHorizontal: 20
    },
    dropdownButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    dropdownText: {
        fontWeight: '500',
        color: '#000'
    }
});