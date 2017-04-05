import {StyleSheet} from 'react-native';

export const SubCategoryStyles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        width: null,
        height: null
    },
    main: {
        flex : 1,
        flexDirection : 'row'
    },
    child2: {
        flex : 1
    },
    customIcon :{
        color: '#ffffff',
        flex : 1,
        textAlign : 'left',
        padding : 7,
        marginLeft : 10
    },
    customIconText : {
        color: '#ffffff',
        fontSize: 18,
        flex : 1,
        textAlign : 'right',
        marginTop : 25,
        marginRight : 12,
        fontFamily: 'QuicksandBold-Regular'
    },
    scroll:{
      flex : 1
    },
    touchableOpacity:{
        flex:1,
        flexDirection : 'row'
    },
    mainDiv : {
        margin : 20,
        flex : 1
    },
    Texture1 :{
        flex :1,
        flexDirection : 'row',
        height : null
    },
    categoryChildren :{
        padding : 20,
        borderColor : '#cdcdcd',
        borderWidth: 1,
    },
    itemsText:{
        fontSize : 15
    }
});