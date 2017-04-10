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
    flex : 1,
    justifyContent: 'center'
  },

  customIcon :{
    color: '#ffffff',
    flex : 1,
    textAlign : 'left',
    padding : 7,
  },

  customIconText : {
    color: '#ffffff',
    fontSize: 20,
    flex : 1,
    paddingRight: 10,
    textAlign : 'right',
    fontFamily: 'QuicksandBold-Regular'
  },

  categoryChild: {
    justifyContent: 'center',
  },

  scroll:{
    flex : 1
  },
  touchableOpacity:{
    flex:1,
    flexDirection : 'row',
    padding: 10,
    alignItems: 'center'
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
      padding : 25,
      borderColor : '#cdcdcd' ,
      borderWidth: 1,
      fontFamily: 'QuicksandBook-Regular'
  },
  itemsText:{
    fontSize : 15
  }
});