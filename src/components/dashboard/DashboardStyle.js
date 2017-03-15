import {StyleSheet} from 'react-native';

export const DashboardStyles = StyleSheet.create({

  imgContainer: {
    flex: 1
  },

  img: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    width: null,
    justifyContent: 'center',
    alignItems: 'center'
  },


  dateTabContainer:{
    flex: 2
  },

  text: {
    fontFamily: 'QuicksandBook-Regular',
    color: '#fff'
  },

  textPrice: {
    fontFamily: 'QuicksandBold-Regular',
    color: '#fff',
    fontSize: 35
  }


});