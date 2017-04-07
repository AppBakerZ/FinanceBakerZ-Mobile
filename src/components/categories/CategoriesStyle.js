import {StyleSheet} from 'react-native';

export const CategoriesStyles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
        width: null,
        height: null
    },
    main: {
        flex : 1,
        flexDirection : 'row'
    },
    child: {
        flex : 1,
        padding: 25
    },

    customIcon :{
        color: '#ffffff',
        textAlign: 'center',
        marginTop: 15
    },
    customIconText : {
        fontFamily: 'QuicksandBook-Regular',
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 15,
        padding : 20
    },
    mainDiv : {
        margin : 20
    },
    Texture :{
        flex :2,
        height : null
    },
    scroll :{
        flex : 1
    }
});