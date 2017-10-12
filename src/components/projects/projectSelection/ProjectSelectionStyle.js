import {StyleSheet, Dimensions} from 'react-native';
let screen = Dimensions.get('window');

export const ProjectSelectionStyles = StyleSheet.create({

  container: {
    backgroundColor: '#fff'
  },

  mainCon: {
    flex: 1,
    padding: 10
  },

  text: {
    fontFamily: 'QuicksandBook-Regular'
  },

  filterShowContainer: {
    paddingLeft: 10,
    borderBottomColor: '#cbcbcb',
    borderBottomWidth: 1
  },

  filterCon: {
    flex: 1
  },

  projectNameCon: {
    justifyContent: 'center'
  },

  clientNameCon: {
    justifyContent: 'center'

  },

  filterStatus: {
    borderBottomColor: '#F5F5F5',
    borderBottomWidth: 1,
    paddingTop: 5,
    paddingLeft: 5
  },

  input: {
    fontFamily: 'QuicksandBook-Regular',
    paddingLeft: 10,
    height: 48
  },

  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5'
  },

  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200
  },

  renderPickerCon: {
    width: screen.width,
    paddingLeft: 15
  },

  bankCardTxtAndIcon: {
    paddingVertical: 10.2,
    paddingLeft: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  iconRight: {
    textAlign: 'right',
    paddingRight: 30
  },

  textLeft: {
    paddingLeft: 5
  },

  picker:{
    marginRight : 10,
    height: 40
  },

  statusBtnText: {
    fontSize: 17
  },

  filterShowText: {
    marginVertical: 6.5
  }
});