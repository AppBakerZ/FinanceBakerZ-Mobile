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
        padding : 20,
    },
    child2: {
        flex : 1,
        padding : 20,
    },
    customIcon :{
        color: '#ffffff',
        textAlign: 'center',
        marginTop: 35,
    },
    customIconText : {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
    },
    mainDiv : {
        margin : 20,
    },
    Texture1 :{
        flex :1,
        height : 210,
    },
    Texture2 :{
        flex :1,
        height : 210,
    },
    AddCategoryIcon : {
        position : 'absolute',
        right : 30,
        flex : 1,
        top : 400,
    }
});