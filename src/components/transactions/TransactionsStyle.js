import {StyleSheet} from 'react-native';

export const TransactionsStyles = StyleSheet.create({

  filterContainer: {
    flex: 1,
    justifyContent: 'center',
      backgroundColor: '#f0f0f0'
  },

  filterMainContainer: {
    paddingTop: 5,
    marginLeft: 15,
    marginRight: 15,
    flex: 1,
    flexDirection: 'row'
  },

  filterContainerTxt: {
    flex: 6,
    justifyContent: 'center'

  },

  filterIconContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
    transitionFilterBg:{
        flex : 1,
        width : null,
        resizeMode : 'cover'
    },

  text: {
    fontFamily: 'QuicksandBook-Regular',
    fontSize: 14

  },

  tabContainer:{
    backgroundColor: '#fff',
    flex: 7
  },

  listViewContainer: {
    flex: 1,
    flexDirection: 'row'
  },

  listViewContentLeft: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1
  },

  listViewContentRight:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1
  },

  icons: {
    flex: 1,
    textAlign: 'center'
  },

  iconText: {
    flex: 3,
    fontFamily: 'QuicksandBook-Regular'

  },

  contentRightText: {
    paddingRight: 20,
    fontFamily: 'QuicksandBook-Regular'
  },

  contentCurrIcon: {
    paddingRight: 5
  },

  loadingCon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }



});