import React, { Component } from 'react';
import { View, Text, Image, ScrollView, Icon, TouchableOpacity, Alert} from 'react-native';
import { CategoriesStyles } from 'FinanceBakerZ/src/components/categories/CategoriesStyle';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import CategoryIcon from 'FinanceBakerZ/src/icons/CategoryIcon';

import Meteor, { createContainer } from 'react-native-meteor';

class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    _onPressButton(){
        this.props.navigation.navigate('SubCategories');
    }

    renderItem(){
        let categories = this.props.categories.map((category) => {
            return
        });
    }
    render() {
        const { categories } = this.props;
        const { navigate } = this.props.navigation;
        console.log('categories :', categories);
        return (
            <ViewContainer>
                <Image source={require('FinanceBakerZ/src/images/app-background.png')} style={CategoriesStyles.backgroundImage}>
                    <ScrollView style={{flex:1}}>
                        <View style={CategoriesStyles.mainDiv}>
                            <View style={CategoriesStyles.main}>
                                <Image source={require('FinanceBakerZ/src/images/category/Category-Img-Box1.png')} style={CategoriesStyles.Texture1}>

                                    <View style={CategoriesStyles.child1}>
                                        <TouchableOpacity activeOpacity={0.3 }  onPress={this._onPressButton.bind(this)}>
                                            <CategoryIcon name ='icons_automobile' style={CategoriesStyles.customIcon} size={80} />
                                            <Text style={CategoriesStyles.customIconText}>AUTOMOBILE</Text>
                                        </TouchableOpacity>

                                    </View>
                                </Image>
                                <Image source={require('FinanceBakerZ/src/images/category/Category-Img-Box2.png')} style={CategoriesStyles.Texture1}>

                                    <View style={CategoriesStyles.child2}>
                                        <TouchableOpacity activeOpacity={0.3}>
                                            <CategoryIcon name ='icons_health-care' style={CategoriesStyles.customIcon} size={80} />
                                            <Text  style={CategoriesStyles.customIconText}>HEALTHCARE</Text>
                                        </TouchableOpacity>

                                    </View>
                                </Image>
                            </View>
                        </View>
                    </ScrollView>
                </Image>

            </ViewContainer>

        );
    }
}

export default createContainer(() => {
    const categoriesHandle = Meteor.subscribe('categories');
    return {
        categoriesReady: categoriesHandle.ready(),
        categories: Meteor.collection('categories').find({
            parent: null
        }, {sort: {createdAt: -1}})
    };
}, Categories);