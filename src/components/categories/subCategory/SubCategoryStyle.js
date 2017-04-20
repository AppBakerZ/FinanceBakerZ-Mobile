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
    categoryIconsDiv:{
        flex : 1,
        alignItems : 'center',
        borderColor : '#cdcdcd',
        borderWidth : 1,
        paddingVertical : 20
    },
  itemsText:{
    fontSize : 15
  },
    fabButtonBg:{
        backgroundColor: '#008142'
    },
    addCategoryMain:{
        flex : 1,
    },
    addCategoryContainer:{
        flex : 1,
    },
    categoryNameField: {
        borderBottomWidth: 1,
        borderBottomColor: '#dadada',
        justifyContent: 'flex-end',
        paddingTop : 30
    },
    input:{
        fontFamily: 'QuicksandBook-Regular',
        fontSize: 15,
        height: 48,
        paddingLeft: 12
    },
    iconParent: {
        flex: 1,
        paddingBottom : 10
    },
    CategoryIconList:{
    flex : 4,
        margin : 10,
        borderColor : '#cdcdcd',
        borderWidth: 1
    },
    SelectCategoryIcon:{
        flex : 1,
    },
    categorySelectionIcon: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#dadada'
    },
    categoryIcons:{
        flexDirection : 'row'
    },
    textLeft: {
        paddingLeft: 12
    },
    iconRight: {
        flex: 1,
        textAlign: 'right',
        paddingRight: 19
    }

});