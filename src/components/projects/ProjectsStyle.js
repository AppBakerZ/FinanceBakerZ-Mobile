import {StyleSheet} from 'react-native';
export const ProjectsStyles = StyleSheet.create({
  projectMainContainer:{
    backgroundColor : '#ffffff'
  },
  filterContainer : {
    flex : 1,
    justifyContent : 'center',
    backgroundColor : '#f7f7f7'
  },
  listViewContainer: {
    flex : 8,
  },
  filterDiv:{
    flexDirection : 'row'
  },
  filterText:{
    flex : 7,
    marginLeft : 20
  },
  filterIcon:{
    flex : 1,
    alignItems : 'center',
    justifyContent : 'center'
  },

  listViewContentLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },

  listViewContentRight:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },

  icons: {
    flex: 1,
    textAlign: 'center'
  },
  AmountContainer:{
    flexDirection : 'row',
    paddingRight : 20,
    flex : 2,
    justifyContent : 'flex-end'
  },
  CurrencySymbol:{
    marginLeft : 5
  },
  iconText:{
    alignItems : 'center',
    fontFamily: 'QuicksandBook-Regular',
    fontSize : 15
  },
  contentRightText: {
    flex : 4,
    fontFamily: 'QuicksandBook-Regular',
    fontSize : 15
  },
  listViewContainerItem:{
    borderColor : '#cdcdcd',
    borderWidth: 1,
    borderTopColor : 'transparent',
    flexDirection:'row',
    paddingVertical:22
  },
  BankText:{
    fontFamily: 'QuicksandBook-Regular',
  },
  loader:{
    flex :1,
    justifyContent : 'center',
    alignItems : 'center'
  },

  errorMsg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }

});