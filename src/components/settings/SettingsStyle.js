import {StyleSheet} from 'react-native';

export const SettingsStyles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        width: null,
        height: null
    },
    contentContainer: {
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    borderBottom: {
        borderBottomWidth: 2,
        borderBottomColor: '#dadada'
    },
    headingText: {
        marginVertical: 10,
        color: '#008142',
        fontFamily: 'QuicksandBold-Regular',
        fontWeight: '500'
    },
    contentText: {
        marginVertical: 10,
        fontFamily: 'QuicksandBook-Regular',
        color: '#333'
    },
    row: {
        flexDirection: 'row'
    },
    notificationRadio: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});