import React, { Component } from 'react';
import { View, Text, Image, ScrollView, Icon, TouchableOpacity} from 'react-native';
import { SubCategoryStyles } from 'FinanceBakerZ/src/components/categories/subCategory/SubCategoryStyle';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import CategoryIcon from 'FinanceBakerZ/src/icons/CategoryIcon';


export default class SubCategory extends Component {
    constructor(props) {
        super(props)
        this.state = {};
    }

    _onPressButton(){

    }

    render(){

        console.log(children, 'this');
        const children = this.props.navigation.state.params;
        let categories = Meteor.collection('categories').find({
            _id: children._id
        })
        console.log(categories, 'categories');
        console.log(children);
        let icon = children.icon.replace('icon-' , "");

        return(

            <ViewContainer>
                <Image source={require('FinanceBakerZ/src/images/app-background.png')} style={SubCategoryStyles.backgroundImage}>
                    <ScrollView style={{flex:1}}>
                        <View style={SubCategoryStyles.mainDiv}>
                            <View style={SubCategoryStyles.main}>
                                <Image source={require('FinanceBakerZ/src/images/category/img1.png')} style={SubCategoryStyles.Texture1}>
                                    <View style={SubCategoryStyles.child2}>
                                        <TouchableOpacity activeOpacity={0.3} style={{flex:1, flexDirection : 'row'}} >
                                            <CategoryIcon name = {icon}  style={SubCategoryStyles.customIcon} size={50} />
                                            <Text  style={SubCategoryStyles.customIconText}>{children.name}</Text>
                                        </TouchableOpacity>

                                    </View>
                                </Image>
                            </View>

                            {children.children.map((val) => {
                            return(
                                <View  style={SubCategoryStyles.items}>
                                    <Text  style={SubCategoryStyles.item}>{val}</Text>
                                </View>
                            )
                                }
                            )}

                            </View>
                    </ScrollView>
                </Image>
            </ViewContainer>
        )
    }
}