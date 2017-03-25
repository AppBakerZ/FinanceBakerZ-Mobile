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
    flex: 1.5,
    backgroundColor: '#F2F2F2'
  },

  filterMainContainer: {
    paddingTop: 5,
    marginLeft: 15,
    marginRight: 15,
    flex: 1,
    flexDirection: 'row'
  },

  filterContainer: {
    flex: 5,
    justifyContent: 'center'
  },

  filterIconContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },

  card: {
    flex: 1.5,
    margin: 10,
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 5
  },

  text: {
    fontFamily: 'QuicksandBook-Regular'
  },

  textWhite: {
    fontFamily: 'QuicksandBook-Regular',
    color: 'white'
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
    justifyContent: 'center'

  },

  childContainerBorder: {
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
  },

  DbSelectionContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20
  },

  DbSelectionTabContainer: {
    flex: 2.5
  },

  DbSelectionAccAndWeek: {
    flex: 1,
    borderBottomColor: '#cbcbcb',
    borderBottomWidth: 1,
    justifyContent: 'center'
  },

  DbSelectionBankAcc: {
    flex: 1,
    justifyContent: 'center'
  },

  DbSelectionText: {
    fontFamily: 'QuicksandBook-Regular',
    fontSize: 15
  },

  DbSelectionCardTag: {
    flexDirection: 'row',
    marginRight: 10,
    padding: 2
  },

  DbSelectionCardTagCross: {
    fontWeight: 'bold',
    lineHeight: 13,
    fontSize: 16
  },


  DbSelectionTag: {
      paddingLeft: 5
  },

  DbSelectionAccountsCon: {
    flexDirection: 'row'
  },

  DbSelectionPicker: {
    borderBottomColor: '#cbcbcb',
    borderBottomWidth: 1
  },

  DbSelectionPickerItem: {
    fontFamily: 'QuicksandBook-Regular'
  },

  DbSelectionBankAccBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#cbcbcb',
    borderBottomWidth: 1,
    paddingLeft: 25,
    paddingBottom: 10
  },

  DbSelectionBankAccText: {
    flex: 1
  },

  DbSelectionBankAccIcon: {
    flex: 1,
    textAlign: 'right'
  },

  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 300
  },

  checkBoxContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#DADADA'
  },

  checkBoxItemCon: {
    flex: 4,
    paddingTop: 3
  },

  checkBoxCon: {
    flex: 0.5
  },

  checkBoxItem: {
    fontFamily: 'QuicksandBook-Regular'
  }


});