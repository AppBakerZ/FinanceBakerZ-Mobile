import {StyleSheet, Dimensions} from 'react-native';
let screen = Dimensions.get('window');

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
  },

  /*UpdateTransaction Styling*/

  renderIncomeForm: {
    padding: 15
  },

  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 250
  },

  renderDetailCon: {
    flex: 1,
    width: screen.width,
    paddingLeft: 15
  },

  updateTranAccountCon: {
    flex: 1,
    justifyContent: 'center'
  },

  updateTranAmountCon: {
    flex: 1,
    justifyContent: 'center',
    position: 'relative'
  },

  updateTranDateCon: {
    flex: 1,
    justifyContent: 'center'
  },

  updateTranTypeCon: {
    flex: 1,
    justifyContent: 'center',
    position: 'relative'
  },

  updateTranTimeCon:{
    flex: 1,
    justifyContent: 'center'
  },

  updateTranProjectCon: {
    flex: 1,
    justifyContent: 'center'
  },

  updateTranRadioCon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#DADADA',
    padding: 5
  },

  updateTranRadioBtnCon: {
    flex: 0.5
  },

  updateTranRadioBtnItemCon: {
    flex: 4,
    paddingVertical: 5
  },

  updateTranRadioBtnItem: {
    flex: 0.5,
    fontFamily: 'QuicksandBook-Regular'
  },

  updateTranAccDropDown: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  input: {
    fontFamily: 'QuicksandBook-Regular',
    height: 48,
    paddingLeft: -15
  },

  iconRight: {
    flex: 1,
    textAlign: 'right'
  },

  textLeft: {
    paddingLeft: 20
  },

  relativeTop: {
    top: 10
  },

  bottomCon: {
    flex: 4
  },

  imgLoading:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },

  loaderView:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  userBill: {
    width: 80,
    height: 80,
  },

  imageCon: {
    flex: 1,
    paddingBottom: 10
  }

});