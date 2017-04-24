import {StyleSheet, Dimensions} from 'react-native';
let screen = Dimensions.get('window');

export const ProjectsStyles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    width: null,
    height: null
  },
  projectMainContainer:{
    backgroundColor : '#ffffff'
  },
  filterContainer : {
    flex : 1,
    justifyContent : 'center'
  },
  projectFilterBg:{
    flex : 1,
    width : null,
    resizeMode : 'cover'
  },
  listViewContainer: {
    flex : 8,
  },
  filterDiv:{
    flexDirection : 'row'
  },
  filterText:{
    flex : 7,
    marginLeft : 20
  },
  filterIcon:{
    flex : 1,
    alignItems : 'center',
    justifyContent : 'center'
  },

  listViewContentLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },

  listViewContentRight:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },

  icons: {
    flex: 1,
    textAlign: 'center'
  },
  AmountContainer:{
    flexDirection : 'row',
    paddingRight : 20,
    flex : 2,
    justifyContent : 'flex-end'
  },
  CurrencySymbol:{
    marginLeft : 5
  },
  iconText:{
    alignItems : 'center',
    fontFamily: 'QuicksandBook-Regular',
    fontSize : 15
  },
  contentRightText: {
    flex : 4,
    fontFamily: 'QuicksandBook-Regular',
    fontSize : 15
  },
  listViewContainerItem:{
    borderBottomColor : '#ddd',
    borderBottomWidth: 1,
    flexDirection:'row',
    paddingVertical:15
  },
  BankText:{
    fontFamily: 'QuicksandBook-Regular'
  },
  loader:{
    flex :1,
    justifyContent : 'center',
    alignItems : 'center'
  },

  errorMsg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  textBold: {
    fontFamily: 'QuicksandBold-Regular'
  },

  projectDetailCon: {
    flex: 1,
    justifyContent: 'space-around',
    marginBottom: 8
  },

  projectDetailText: {
    fontFamily: 'QuicksandBook-Regular',
    fontSize: 14
  },

  projectDetailAmount: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  headingModal: {
    fontSize: 20,
    color: '#008142',
    paddingVertical: 20
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

  /* CreateProject Styling */

  inputBorderBottom: {
    justifyContent: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5'
  },

  inputProjectNameCon:{
    flex: 1,
    justifyContent: 'center'
  },

  inputClientName:{
    flex: 1
  },

  inputTypeCon:{
    flex: 1
  },

  inputAmountCon:{
    flex: 1
  },

  inputPickerCon: {
    flex: 1
  },

  inputDateCon: {
    flex: 1
  },

  input: {
    fontFamily: 'QuicksandBook-Regular',
    paddingLeft: 10,
    height: 48
  },

  inputDate: {
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
    paddingVertical: 5
  },

  projectCardTxtAndIcon: {
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
    paddingLeft: 20
  },

  renderPickerCon: {
    width: screen.width,
    paddingLeft: 15
  },

  statusTextView: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 8,
    paddingLeft: 10
  },

  inputDateText: {
    paddingLeft: 10
  },

  inputDateSelected: {
    paddingVertical: 10,
    paddingLeft: 20
  },

  bottomCon: {
    flex: 4
  },

  projectTitleAndBtn: {
    flexDirection: 'row'
  },

  projectDetailTitle: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20
  },

  projectDetailButtons: {
    flex: 1
  },

  editBtn: {
    color: '#ff9c00',
    paddingRight: 18
  },

  deleteBtn: {
    color: '#c71212'
  }

});