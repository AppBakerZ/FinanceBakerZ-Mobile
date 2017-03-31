import React, { Component } from 'react';
import { View, Text, Image, ScrollView, Icon, TouchableOpacity, Alert} from 'react-native';
import { CategoriesStyles } from 'FinanceBakerZ/src/components/categories/CategoriesStyle';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import CategoryIcon from 'FinanceBakerZ/src/icons/CategoryIcon';
import Meteor, { createContainer } from 'react-native-meteor';

let firstImg = require("FinanceBakerZ/src/images/category/img1.png");
let secondImg = require("FinanceBakerZ/src/images/category/Category-Img-Box2.png");

class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category : []
        };

        Array.prototype.chunk = function(chunkSize) {
            var array = this;
            return [].concat.apply([],
                array.map(function(elem, i) {
                    return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
                })
            );
        };
    }
    getCategory(section, i){
        return(
            <View style={CategoriesStyles.main}>
                {section.map((categoryObject, index) => {
                    let icon = categoryObject.icon.replace('icon-' , "");
                    i++;
                    return(
                        <Image source={((i % 2 == (Math.ceil(i / 2) % 1 == 0) ? 0 : 1) ? firstImg : secondImg)} style={CategoriesStyles.Texture}>
                            <View key={index} style={CategoriesStyles.child}>
                                <TouchableOpacity activeOpacity={0.3 }  onPress={this._onPressButton.bind(this, categoryObject._id)}>
                                    <CategoryIcon name ={icon} style={CategoriesStyles.customIcon} size={60} />
                                    <Text style={CategoriesStyles.customIconText}>{categoryObject.name.toUpperCase()}</Text>
                                </TouchableOpacity>
                            </View>
                        </Image>
                    );
                })}
            </ View>
        )
    }

    mainContainer(){
        return (
            <View style={CategoriesStyles.mainDiv}>
                {this.state.category.map((section, i) => {
                    return(
                        this.getCategory(section,i)
                    )
                })}
            </View>

        )
    }

    componentWillReceiveProps(props){
        this.setState({category: props.categories.chunk(2)});
    }
    _onPressButton(parentId){
        this.props.navigation.navigate('SubCategories', {parentId});
    }
    render() {
        const { categories } = this.props;
        const { navigate } = this.props.navigation;
        return (
            <ViewContainer>
                <Image source={require('FinanceBakerZ/src/images/app-background.png')} style={CategoriesStyles.backgroundImage}>
                    <ScrollView style={CategoriesStyles.scroll}>
                        {this.mainContainer()}
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