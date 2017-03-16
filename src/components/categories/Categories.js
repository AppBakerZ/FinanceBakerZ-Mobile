import React, { Component } from 'react';
import { View, Text, Image, ScrollView, Icon} from 'react-native';
import { CategoriesStyles } from 'FinanceBakerZ/src/components/categories/CategoriesStyle';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import CategoryIcon from 'FinanceBakerZ/src/icons/CategoryIcon';

export default class Categories extends Component {
    constructor(props) {
        super(props)
        this.state = {

        };
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <ViewContainer>
                <Image source={require('FinanceBakerZ/src/images/app-background.png')} style={CategoriesStyles.backgroundImage}>
                    <ScrollView style={{flex:1}}>
                        <View style={CategoriesStyles.mainDiv}>
                            <View style={CategoriesStyles.main}>
                                <Image source={require('FinanceBakerZ/src/images/category/Category-Img-Box1.png')} style={CategoriesStyles.Texture1}>

                                    <View style={CategoriesStyles.child1}>
                                        <CategoryIcon name ='icons_automobile' style={CategoriesStyles.customIcon} size={80} />
                                        <Text style={CategoriesStyles.customIconText}>AUTOMOBILE</Text>
                                    </View>
                                </Image>
                                <Image source={require('FinanceBakerZ/src/images/category/Category-Img-Box2.png')} style={CategoriesStyles.Texture1}>

                                    <View style={CategoriesStyles.child2}>
                                        <CategoryIcon name ='icons_health-care' style={CategoriesStyles.customIcon} size={80} />
                                        <Text  style={CategoriesStyles.customIconText}>HEALTHCARE</Text></View>
                                </Image>
                            </View>


                            <View style={CategoriesStyles.main}>
                                <Image source={require('FinanceBakerZ/src/images/category/Category-Img-Box2.png')} style={CategoriesStyles.Texture2}>
                                    <View style={CategoriesStyles.child2}>
                                        <CategoryIcon name ='icons_food'style={CategoriesStyles.customIcon} size={80} />
                                        <Text style={CategoriesStyles.customIconText}>FOOD</Text></View>
                                </Image>
                                <Image source={require('FinanceBakerZ/src/images/category/Category-Img-Box1.png')} style={CategoriesStyles.Texture1}>

                                    <View style={CategoriesStyles.child1}>
                                        <CategoryIcon name ='icons_automobile' style={CategoriesStyles.customIcon} size={80} />
                                        <Text style={CategoriesStyles.customIconText}>AUTOMOBILE</Text></View>
                                </Image>
                            </View>
                            <View style={CategoriesStyles.main}>
                                <Image source={require('FinanceBakerZ/src/images/category/Category-Img-Box1.png')} style={CategoriesStyles.Texture1}>

                                    <View style={CategoriesStyles.child1}>
                                        <CategoryIcon name ='icons_child-care' style={CategoriesStyles.customIcon} size={80} />
                                        <Text style={CategoriesStyles.customIconText}>CHILD</Text></View>
                                </Image>
                                <Image source={require('FinanceBakerZ/src/images/category/Category-Img-Box2.png')} style={CategoriesStyles.Texture2}>

                                    <View style={CategoriesStyles.child2}>
                                        <CategoryIcon name ='icons_coffee' style={CategoriesStyles.customIcon} size={80} />
                                        <Text  style={CategoriesStyles.customIconText}>COFFEE</Text></View>
                                </Image>
                            </View>
                            <View style={CategoriesStyles.main}>
                                <Image source={require('FinanceBakerZ/src/images/category/Category-Img-Box2.png')} style={CategoriesStyles.Texture2}>

                                    <View style={CategoriesStyles.child2}>
                                        <CategoryIcon name ='icons_dinner' style={CategoriesStyles.customIcon} size={80} />
                                        <Text  style={CategoriesStyles.customIconText}>DINNER</Text></View>
                                </Image>
                                <Image source={require('FinanceBakerZ/src/images/category/Category-Img-Box1.png')} style={CategoriesStyles.Texture1}>

                                    <View style={CategoriesStyles.child1}>
                                        <CategoryIcon name ='icons_automobile' style={CategoriesStyles.customIcon} size={80} />
                                        <Text  style={CategoriesStyles.customIconText}>AUTOMOBILE</Text></View>
                                </Image>
                            </View>
                            <View style={CategoriesStyles.main}>
                                <Image source={require('FinanceBakerZ/src/images/category/Category-Img-Box1.png')} style={CategoriesStyles.Texture1}>

                                    <View style={CategoriesStyles.child1}>
                                        <CategoryIcon name ='icons_coffee'style={CategoriesStyles.customIcon} size={80} />
                                        <Text  style={CategoriesStyles.customIconText}>COFFEE</Text></View>
                                </Image>
                                <Image source={require('FinanceBakerZ/src/images/category/Category-Img-Box2.png')} style={CategoriesStyles.Texture2}>

                                    <View style={CategoriesStyles.child2}>
                                        <CategoryIcon name ='icons_zakaat' style={CategoriesStyles.customIcon} size={80} />
                                        <Text  style={CategoriesStyles.customIconText}>HEALTHCARE</Text></View>
                                </Image>
                            </View>
                        </View>
                        <View  style={CategoriesStyles.AddCategoryIcon}>
                        <CategoryIcon name ='icons_clock' size={70} />
                        </View>
                    </ScrollView>
                </Image>

            </ViewContainer>

        );
    }
}


