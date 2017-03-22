import React, { Component } from 'react';
import { View, Text, Image, ScrollView, Icon, TouchableOpacity, Alert} from 'react-native';
import { CategoriesStyles } from 'FinanceBakerZ/src/components/categories/CategoriesStyle';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import CategoryIcon from 'FinanceBakerZ/src/icons/CategoryIcon';

import Meteor, { createContainer } from 'react-native-meteor';

let newData = [];
let firstImg = require("FinanceBakerZ/src/images/category/img1.png");
let secondImg = require("FinanceBakerZ/src/images/category/Category-Img-Box2.png");


class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };


        Array.prototype.chunk = function(chunkSize) {
            var array = this;
            console.log(this,"kashif");
            return [].concat.apply([],
                array.map(function(elem, i) {
                    return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
                })
            );
        };

    }
    componentWillReceiveProps(props){

        newData = props.categories.chunk(2)
        console.log('data', newData);
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
                            {newData.map((section, i) => {
                                console.log(section);
                                return(
                                    <View style={CategoriesStyles.main}>
                                        {section.map((item, index) => {
                                            let icon = item.icon.replace('icon-' , "");
                                            console.log(icon);
                                            i++;
                                            return(
                                                <Image source={((i % 2 == (Math.ceil(i / 2) % 1 == 0) ? 0 : 1) ? firstImg : secondImg)} style={CategoriesStyles.Texture}>
                                                    <View style={CategoriesStyles.child}>
                                                        <TouchableOpacity activeOpacity={0.3 }  onPress={this._onPressButton.bind(this)}>
                                                            <CategoryIcon name ={icon} style={CategoriesStyles.customIcon} size={60} />
                                                            <Text style={CategoriesStyles.customIconText}>{item.name.toUpperCase()}</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </Image>
                                            );
                                        })}
                                    </ View>);
                            })}
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