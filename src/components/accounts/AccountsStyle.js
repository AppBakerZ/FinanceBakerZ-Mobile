import {StyleSheet} from 'react-native';

export const AccountsStyles = StyleSheet.create({
  box: {
    height: 150,
    marginTop: 20,
    marginLeft: 20,
    marginRight:20,
    borderColor: '#cdcdcd',
    borderWidth: 1,
    flexDirection: 'row',
  },
  imgBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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

  card: {
    flex: 1,
    padding : 18,
    marginTop: 20,
    marginLeft: 25,
    marginRight: 25,
    flexDirection: 'row'
  },
  text: {
    fontFamily: 'QuicksandBook-Regular',
    color: '#696969'
  },
  scroll:{
    flex :1
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
  }


});