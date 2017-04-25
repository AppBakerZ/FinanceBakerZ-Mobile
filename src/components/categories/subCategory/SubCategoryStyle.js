import {StyleSheet, Dimensions} from 'react-native';
let screen = Dimensions.get('window');

export const SubCategoryStyles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        width: null,
        height: null
    },
    main: {
        flex : 1,
        flexDirection : 'row'
    },
    child2: {
        flex : 1,
        justifyContent: 'center'
    },

    customIcon :{
        color: '#ffffff',
        flex : 1,
        textAlign : 'left',
        padding : 7,
    },

    customIconText : {
        color: '#ffffff',
        fontSize: 20,
        textAlign : 'right',
        fontFamily: 'QuicksandBold-Regular',
        flex : 5
    },

    categoryChild: {
        justifyContent: 'center',
    },

    scroll:{
        flex : 1
    },
    touchableOpacity:{
        flex:1,
        flexDirection : 'row',
        padding: 10,
        alignItems: 'center'
    },
    mainDiv : {
        margin : 20,
        flex : 1
    },
    Texture1 :{
        flex :1,
        flexDirection : 'row',
        height : null
    },
    categoryChildren :{
        fontFamily: 'QuicksandBook-Regular',
    },
    noCategoryChildren:{
        alignItems:'center',
    },
    subCategoryChildren :{
        flex : 1,
        paddingHorizontal:20,
        height : 80,
        justifyContent : 'center',
        borderColor : '#cdcdcd',
        borderTopColor : '#ffffff',
        borderWidth: 1
    },
    categoryIconsDiv:{
        flex: 1,
        height: screen.height * .14,
        alignItems: 'center',
        justifyContent: 'center',
        borderRightColor: '#dadada',
        borderRightWidth: 1,
        borderBottomColor: '#dadada',
        borderBottomWidth: 1,
        maxWidth: screen.width * .265
    },
    itemsText:{
        fontSize : 15
    },
    fabButtonBg:{
        backgroundColor: '#008142'
    },
    addCategoryMain:{
        flex : 1,
        flexDirection : 'row',
    },
    addCategorySub:{
        flex : 1,
    },
    addCategoryContainer:{
        flex : 1,
    },
    categoryNameField: {
        flex : 2,
        borderBottomWidth: 1,
        borderBottomColor: '#dadada',
        justifyContent: 'flex-end'
    },
    categoryStyle:{
        flex : 1,
    },
    categoryName:{
        flex : 1,
    },
    input:{
        fontFamily: 'QuicksandBook-Regular',
        fontSize: 15,
        height: 50,
        paddingLeft: 12,
    },
    iconParent: {
        flex:1.2,
        paddingBottom : 10
    },
    febButton:{
        flex : 2,
    },
    CategoryIconList:{
        flex : 7,
        borderColor : '#cdcdcd',
        borderWidth : 1,
        margin : 15,
        paddingLeft : 25
    },
    SelectCategoryIcon:{
        flex : 1,
    },
    selectParentText:{
        paddingLeft : 10,
        paddingTop : 10,
        fontFamily: 'QuicksandBook-Regular'

    },
    categorySelectionIcon: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    categorySelectionParentIcon:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    categoryIcons:{
        flexDirection : 'row'
    },
    textLeft: {
        paddingLeft: 12,
        fontFamily: 'QuicksandBook-Regular'
    },
    iconRight: {
        flex: 1,
        textAlign: 'right',
        paddingRight: 19,
    },
    ParentCategoryText: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 200
    },
    BankText:{
        fontFamily: 'QuicksandBook-Regular'
    },

    renderListCon: {
        width: screen.width,
        paddingLeft: 15
    },
    ParentCategory:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#dadada'
    }

});