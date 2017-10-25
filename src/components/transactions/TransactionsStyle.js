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
    flexDirection: 'row',
    backgroundColor: 'transparent'
  },

  filterContainerTxt: {
    flex: 6,
    justifyContent: 'center'

  },

  filterIconContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: 'transparent'
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
    fontFamily: 'QuicksandBold-Regular'
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
    paddingTop: 20,
    paddingBottom: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },

  viewTransactionBankDepositCon: {
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },

  viewTransactionDepositedInCon: {
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },

  viewTransactionUserInfoCon: {
    alignItems: 'center',
    paddingVertical: 15

  },

  borderBottom: {
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 1
  },

  borderTop: {
    borderTopColor: '#EEEEEE',
    borderTopWidth: 1
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

  CurrencyViewContainer:{
    flexDirection : 'row',
    alignItems: 'center'
  },

  /*UpdateTransaction Styling*/

  renderIncomeForm: {
    paddingHorizontal: 15,
    paddingVertical: 10
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
    justifyContent: 'center',
    paddingVertical: 8.5
  },

  updateTranAmountCon: {
    justifyContent: 'center',
    position: 'relative'
  },

  tranDateTimeCon: {
    justifyContent: 'center',
    paddingVertical: 12
  },

  updateTranTypeCon: {
    justifyContent: 'center',
    position: 'relative'
  },

  updateTranTypeConIOS: {
    justifyContent: 'center',
    position: 'relative',
    paddingVertical: 8.5
  },

  picker:{
    marginLeft : -7,
    height: 40,
    marginTop: 5
  },

  titleText: {
    paddingBottom: 5
  },

  chooseBill: {
    paddingTop: 22.5
  },

  widthoutBillImage: {
    paddingBottom: 22.5,
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 1
  },

  widthBillImage: {
    paddingTop: 15,
    marginBottom: 10
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6
  },

  input: {
    fontFamily: 'QuicksandBook-Regular',
    height: 48,
    paddingLeft: -15
  },

  inputWithTitle: {
    fontFamily: 'QuicksandBook-Regular',
    height: 45,
    paddingLeft: -15
  },

  iconRight: {
    paddingRight: 20,
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
    height: 80
  },

  imageCon: {
    flex: 1,
    paddingBottom: 15
  },

  filterApplied: {
    color: '#1F9058',
    fontSize: 22,
    fontFamily: 'QuicksandBold-Regular'
  }
});