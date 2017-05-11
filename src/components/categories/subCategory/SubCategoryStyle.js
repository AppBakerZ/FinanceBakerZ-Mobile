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
        padding : 7
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
        flex : 1
    },
    addCategoryContainer:{
        flex : 1.3
    },
    categoryNameField: {
        flex : 2,
        borderBottomWidth: 1,
        borderBottomColor: '#dadada',
        justifyContent: 'flex-end',
    },
    labelContainer:{
        flex :1,
        justifyContent : 'flex-end'

    },
    categoryStyle:{
        flex : 1
    },
    categoryName:{
        flex : 1
    },
    input:{
        fontFamily: 'QuicksandBook-Regular',
        fontSize: 15,
        height: 50,
        paddingLeft: 15,
        paddingRight: 15,
    },
    iconParent: {
        flex:1.2,
        paddingLeft : 5,
    },
    febButton:{
        flex : 1.8
    },
    CategoryIconList: {
        flex: 5,
        borderColor: '#cdcdcd',
        borderWidth: 1,
        margin : 15
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 200
    },
    SelectCategoryIcon:{
        flex : 1,
        justifyContent: 'center',
    },
    SelectCategoryIconLabel:{
        flex : 0.5,
        justifyContent: 'flex-end',
    },
    categorySelectLabel:{
     flex : 0.6,
        justifyContent : 'flex-end'
    },
    selectParentText:{
        fontFamily: 'QuicksandBold-Regular',
        paddingLeft : 15,
        paddingRight : 15,
        paddingTop : 10
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
        flexDirection : 'row',
        flex : 1,
    },
    textLeft: {
        paddingLeft: 15,
        fontFamily: 'QuicksandBook-Regular',
    },
    textLeftUrdu:{
        paddingLeft: 15,
        fontFamily: 'QuicksandBook-Regular',
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
    },
    SubcategoryTouchable:{
        flex : 1
    },
    picker:{
        marginLeft : 8,
        marginRight : 15
    }

});