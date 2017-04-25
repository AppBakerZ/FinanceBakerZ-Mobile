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

  textBold:{
    fontFamily: 'QuicksandBold-Regular',
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
  },

  /*ViewTransaction Styling*/

  viewTransactionMainCon: {
    flex: 1
  },

  viewTransactionIdAndDateCon:{
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center'
  },

  viewTransactionBankDepositCon: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center'
  },

  viewTransactionDepositedInCon: {
    flex: 0.6,
    paddingVertical: 10,
    justifyContent: 'space-around',
    alignItems: 'center'
  },

  viewTransactionUserInfoCon: {
    flex: 2,
    alignItems: 'center',
    paddingTop: 20

  },

  borderBottom: {
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 1
  },

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    width: null,
    height: null
  },

  greenText: {
    color: '#008142'
  },

  redText: {
    color: '#C81113'
  },

  paddingBottom: {
    paddingBottom: 15
  },

  fabButton: {
    backgroundColor: '#ff9c00'
  },


  currencyIconCon: {
    flexDirection: 'row',
    alignItems: 'center'
  }

});