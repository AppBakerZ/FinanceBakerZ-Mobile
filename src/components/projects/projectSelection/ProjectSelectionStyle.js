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
    flex: 1.2,
    justifyContent: 'space-around',
    paddingLeft: 10,
    borderBottomColor: '#cbcbcb',
    borderBottomWidth: 1
  },

  filterCon: {
    flex: 3,
    paddingVertical: 12,
  },

  projectNameCon: {
    justifyContent: 'center'
  },

  clientNameCon: {
    flex: 1,
    justifyContent: 'center'

  },

  filterStatus: {
    flex: 1,
    justifyContent: 'center',
    borderBottomColor: '#F5F5F5',
    borderBottomWidth: 1,
    paddingLeft: 10
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

  bottomCon: {
    flex: 3
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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },

  iconRight: {
    flex: 1,
    textAlign: 'right',
    paddingRight: 19
  },

  textLeft: {
    paddingLeft: 5
  }


});

