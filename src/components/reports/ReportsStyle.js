import {StyleSheet} from 'react-native';

export const ReportsStyles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        width: null,
        height: null
    },
    filterContainer: {
        backgroundColor: '#f7f7f7'
    },
    filterBtnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 15,
        //backgroundColor: 'orange'
    },
    filterTextContainer: {
        flex: 1
    },
    filterIconContainer: {

    },
    filterText: {
        fontSize: 22,
        color: '#000',
        fontFamily: 'QuicksandBold-Regular'
    },
    generateBtnContainer: {
        //backgroundColor: 'green',
        paddingHorizontal: 15,
        marginBottom: 20

    },
    generateBtn: {
        paddingVertical: 18,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5
    },
    disabledBtn: {
        backgroundColor: '#888'
    },
    activeBtn: {
        backgroundColor: '#00562f'
    },
    generateBtnText: {
        color: '#fff',
        fontSize: 21,
        fontFamily: 'QuicksandBold-Regular'
    },
    greenText: {
        color: '#1F9058',
        fontSize: 22,
        fontFamily: 'QuicksandBold-Regular'
    },
    allReportHeader: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        paddingVertical: 15.7
    },
    allReportHeaderText: {
        color: '#3b3b3b',
        fontSize: 16,
        fontFamily: 'QuicksandBold-Regular'
    },
    generatedReportContainer: {

    },
    historyReportedBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12.2,
        marginBottom: 5,
        overflow: 'hidden',
        backgroundColor: '#fff',
        //borderBottomWidth: 1,
        //borderBottomColor: '#eee',
        elevation: 2
    },
    historyReportedDate: {
        flex: 1,
        fontSize: 16,
        fontFamily: 'QuicksandBold-Regular'
    },
    historyReportedIcon: {

    }
});