import {StyleSheet} from 'react-native';

export const DashboardStyles = StyleSheet.create({

  imgContainer: {
    flex: 1.2
  },

  img: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    width: null,
    justifyContent: 'center',
    alignItems: 'center'
  },


  dateTabContainer:{
    flex: 1.5
  },

  text: {
    fontFamily: 'QuicksandBook-Regular',
    color: '#fff'
  },

  textPrice: {
    fontFamily: 'QuicksandBold-Regular',
    color: '#fff',
    fontSize: 35
  },

  tabScreenContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 20
  },

  childContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#DADADA'
  },


  bottomTabContainer: {
    flex: 3
  },

  textHeading: {
    color: '#838383',
    fontFamily: 'QuicksandBook-Regular'
  },

  greenText: {
    color: '#1F9058',
    fontSize: 22,
    fontFamily: 'QuicksandBold-Regular'
  },

  redText: {
    color: '#C71818',
    fontSize: 22,
    fontFamily: 'QuicksandBold-Regular'
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
    justifyContent: 'center',
    alignItems: 'flex-end',
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

  }

});