import {StyleSheet, Dimensions} from 'react-native';
let screen = Dimensions.get('window');

import { setTheme, MKColor } from 'react-native-material-kit';

setTheme({checkboxStyle: {
  fillColor: MKColor.Green,
  borderOnColor: MKColor.Green,
  borderOffColor: MKColor.Green,
  rippleColor: `rgba(${MKColor.RGBTeal},.15)`,
}});

setTheme({radioStyle: {
  fillColor: `rgba(0, 86, 47, 1)`,
  borderOnColor: `rgba(149, 165, 166,.5)`,
  borderOffColor: `rgba(149, 165, 166,.5)`,
  rippleColor: `rgba(0, 86, 47, .15)`,
}});


export const TransactionSelStyles = StyleSheet.create({


  DbSelectionContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#fff'
  },

  DbSelectionTabContainer: {
    flex: 2.5
  },

  DbSelectionAccAndWeek: {
    flex: 1,
    borderBottomColor: '#cbcbcb',
    borderBottomWidth: 1,
    justifyContent: 'center',
  },

  DbSelectionBankAcc: {
    flex: 1,
    justifyContent: 'center'
  },

  DbSelectionText: {
    fontFamily: 'QuicksandBook-Regular',
    fontSize: 15,
  },

  DbSelectionCardTagCon: {
    flexWrap: 'wrap',
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
    flexWrap: 'wrap',
    flexDirection: 'row',
      alignItems: 'flex-start'

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
    borderBottomWidth: 1,
    borderBottomColor: '#DADADA',
    padding: 5
  },

  checkBox: {
    height: 18,
    width: 18
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
  },

  renderListCon: {
    width: screen.width,
    paddingLeft: 15
  },

  tabContainer: {
    backgroundColor: '#fff'
  },

  tabItemCon: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    marginLeft: 10
  },

  tabItemTxt: {
    marginLeft: 10
  },

  radioIcon: {
    padding: 10
  },

  tabContainerCustom: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 20
  },

  textCon: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#cbcbcb'
  },

  text: {
    fontFamily: 'QuicksandBook-Regular',
    fontSize: 20
  },

  modalFooter: {
    flex: 1,
    justifyContent: 'flex-end'
  },

  pickerIOS: {
    flex: 1,
    justifyContent: 'flex-end'
  },

  btn: {
    backgroundColor: '#008142',
    padding: 20,
  },

  modalText: {
    fontFamily: 'QuicksandBook-Regular',
    color: '#fff',
    textAlign: 'center',
    justifyContent: 'flex-end',
    fontSize: 25
  }


});

