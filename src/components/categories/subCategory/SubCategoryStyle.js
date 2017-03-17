import {StyleSheet} from 'react-native';

export const SubCategoryStyles = StyleSheet.create({
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
    child2: {
        flex : 1,
    },
    customIcon :{
        color: '#ffffff',
        flex : 1,
        paddingLeft : 30,

    },
    customIconText : {
        color: '#ffffff',
        fontSize: 25,
        flex : 1,
        textAlign : 'right',
        paddingTop : 40,
        paddingRight : 25,
    },
    mainDiv : {
        margin : 20,
        flex : 1,
    },
    Texture1 :{
        flex :1,
        flexDirection : 'row',
        height : 120,
    },
    items :{
        padding : 40,
        borderBottomColor : '#cdcdcd' ,
        borderLeftColor : '#cdcdcd' ,
        borderRightColor : '#cdcdcd' ,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
    },
    itemsText:{
        fontSize : 20
    }
});