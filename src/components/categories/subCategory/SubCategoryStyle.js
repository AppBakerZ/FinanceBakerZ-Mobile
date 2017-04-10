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
    textAlign : 'right',
    fontFamily: 'QuicksandBold-Regular',
      flex : 5
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
      fontFamily: 'QuicksandBook-Regular',
  },
    noCategoryChildren:{
    alignItems:'center',
    },
    subCategoryChildren :{
        flex : 1,
        paddingHorizontal:20,
        height : 80,
        justifyContent : 'center',
        borderColor : '#cdcdcd',
        borderTopColor : '#ffffff',
        borderWidth: 1
    },
  itemsText:{
    fontSize : 15
  }
});