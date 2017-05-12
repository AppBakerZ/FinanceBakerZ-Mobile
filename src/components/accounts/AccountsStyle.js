import {StyleSheet, Dimensions} from 'react-native';
let screen = Dimensions.get('window');

export const AccountsStyles = StyleSheet.create({

  imgBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },

  detailBox: {
    flex: 1.5,
    paddingLeft: 15
  },

  accNo: {
    fontFamily: 'QuicksandBold-Regular',
    color: 'black'
  },

  amount: {
    fontSize: 15,
    fontFamily: 'QuicksandBold-Regular',
    color: 'black',
    paddingLeft: 5
  },

  lastElementPadding: {
    paddingBottom: 35
  },

  card: {
    flex: 1,
    padding : 18,
    flexDirection: 'row',
    marginVertical: 10
  },

  text: {
    fontFamily: 'QuicksandBook-Regular',
    color: '#696969',
      paddingLeft : -10,
  },

  textBold: {
    fontFamily: 'QuicksandBold-Regular'
  },
  scroll:{
    flex :1,
    padding: 20
  },
  currencyAndAmount: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  loaderView:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: null,
    height: null
  },

  fabButtonBg: {
    backgroundColor: '#008142'
  },

  addAccCon: {
    flex: 1,
    paddingHorizontal: 20
  },
    pickerCountry:{
    marginLeft: -8,
    },
  pickerAndroidCon: {
    flex: 1.6,
    borderBottomWidth: 1,
    borderBottomColor: '#dadada',
    justifyContent: 'flex-end',
    position: 'relative',
  },
    picker:{
        marginLeft : -7
    },
  bankCardCon: {
    flex: 1.3,
    justifyContent: 'center'
  },

  bankCardTxtAndIcon: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#dadada',
  },

  iconRight: {
    flex: 1,
    textAlign: 'right',
    paddingRight: 5
  },

  textLeft: {
    paddingLeft: 12,
  },

  bankIconsCon: {
    flex: 3,
    borderBottomColor: '#dadada',
    borderLeftColor: '#dadada',
    borderRightColor: '#dadada',
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1
  },

  bankIconCon: {
    flexDirection: 'row'
  },

  bankIcon: {
    flex: 1,
    height: screen.height * .14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightColor: '#dadada',
    borderRightWidth: 1,
    borderBottomColor: '#dadada',
    borderBottomWidth: 1,
    maxWidth: screen.width * .4
  },
  accountNoCon: {
    flex: 1.4,
    borderBottomWidth: 1,
    borderBottomColor: '#dadada',
    justifyContent: 'flex-end'
  },

  checkMarkCon: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center'
  },

  loaderCon: {
    alignItems: 'center',
    flex: 5
  },

  loaderBank: {
    flex: 3.3,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#dadada',
    borderLeftColor: '#dadada',
    borderRightColor: '#dadada',
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    marginHorizontal: 10,
    padding: 10

  },

  BtnCon: {
    flex: 1
  },

  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200
  },

  renderListCon: {
    width: screen.width,
    paddingLeft: 15
  },

  input: {
    fontFamily: 'QuicksandBook-Regular',
    fontSize: 15,
    height: 48,
  },

  selectParentText:{
    paddingLeft : 8,
    top: 10
  },

  labelCon: {
    flex: 1,
    justifyContent: 'flex-end',
  }


});