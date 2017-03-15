import {StyleSheet} from 'react-native';

export const CategoriesStyles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
        width: null,
        height: null
    },
    main: {
        backgroundColor: '#00562f',
        flex : 1,
        flexDirection : 'row',
        marginLeft : 20,
        marginRight : 20,

    },
    child1: {
        backgroundColor: '#5b9972',
        flex : 1,
        color : '#ffffff',
        height : 200,
    },
    child2: {
        backgroundColor: '#174844',
        flex : 1,
    }
});