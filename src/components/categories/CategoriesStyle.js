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
        flexDirection : 'row',
    },
    child1: {
        flex : 1,

    },
    child2: {
        flex : 1,

    },
    customIcon :{
        color: '#ffffff',
        textAlign: 'center',
        marginTop: 25,
    },
    customIconText : {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 15,
        paddingTop : 20,
        paddingBottom : 50,
    },
    mainDiv : {
        margin : 20,
        backgroundColor : '#008000',
    },
    Texture1 :{
        flex :1,
        height : 200,
    },
    Texture2 :{
        flex :1,
        height : 200,

    },
});