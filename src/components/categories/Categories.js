import React, { Component } from 'react';
import { View, Text} from 'react-native';
import { CategoriesStyles } from 'FinanceBakerZ/src/components/categories/CategoriesStyle';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';

export default class Categories extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }
    

    render() {
        const { navigate } = this.props.navigation;

        return (
            <ViewContainer>
                <Text>Categories</Text>
            </ViewContainer>
        );
    }
}