import React, { Component, PropTypes } from 'react';
import { View, Text, Image, ScrollView, Icon, TouchableOpacity} from 'react-native';
import { SubCategoryStyles } from 'FinanceBakerZ/src/components/categories/subCategory/SubCategoryStyle';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import CategoryIcon from 'FinanceBakerZ/src/icons/CategoryIcon';

import Meteor, { createContainer } from 'react-native-meteor';

class SubCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    renderSubCategory(children) {
        return children.map((val) => {
                return(
                    <View key={val} style={SubCategoryStyles.categoryChild}>
                        <Text style={SubCategoryStyles.categoryChildren}>{val}</Text>

                    </View>
                )
            }
        )
    }
    render(){
        let { subCategories } = this.props;
        let { children } = subCategories;
        let icon = subCategories.icon.replace('icon-' , "");
        return(

            <ViewContainer>
                <Image source={require('FinanceBakerZ/src/images/app-background.png')} style={SubCategoryStyles.backgroundImage}>
                    <ScrollView style={SubCategoryStyles.scroll}>
                        <View style={SubCategoryStyles.mainDiv}>
                            <View style={SubCategoryStyles.main}>
                                <Image source={require('FinanceBakerZ/src/images/category/img1.png')} style={SubCategoryStyles.Texture1}>
                                    <View style={SubCategoryStyles.child2}>
                                        <TouchableOpacity activeOpacity={0.3} style={SubCategoryStyles.touchableOpacity} >
                                            <Text  style={SubCategoryStyles.customIconText}>{subCategories.name.toUpperCase()}</Text>
                                            <CategoryIcon  style={SubCategoryStyles.customIcon} name={icon} size={60}/>

                                        </TouchableOpacity>

                                    </View>
                                </Image>
                            </View>

                            {this.renderSubCategory(children)}

                        </View>
                    </ScrollView>
                </Image>
            </ViewContainer>
        )
    }
}
SubCategory.propTypes = {
    subCategories: PropTypes.object.isRequired
};
export default createContainer((props) => {
    const {params} = props.navigation.state;
    return {
        subCategories: Meteor.collection('categories').findOne({
            _id: params.parentId
        })
    };
}, SubCategory);