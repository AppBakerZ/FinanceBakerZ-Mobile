import {StyleSheet} from 'react-native';

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

  card: {
    flex: 1,
    padding : 18,
    flexDirection: 'row',
    marginVertical: 10
  },

  text: {
    fontFamily: 'QuicksandBook-Regular',
    color: '#696969'
  },

  scroll:{
    flex :1,
    margin: 20
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