import React, { Component } from 'react';
import Categories from 'FinanceBakerZ/src/components/categories/Categories'

export default class CategoriesScreen extends Component {
    render() {
        return (
            <Categories {...this.props} />
        );
    }
}