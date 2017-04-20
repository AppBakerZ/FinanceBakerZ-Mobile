import React, { Component } from 'react';
import { View, Text, Image, ScrollView, Picker, Platform, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import { SubCategoryStyles } from 'FinanceBakerZ/src/components/categories/subCategory/SubCategoryStyle';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import {chunk} from 'FinanceBakerZ/src/customLibrary';
import CategoryIconsName from 'FinanceBakerZ/src/CategoryIconsName';
import CategoryIconShow from 'FinanceBakerZ/src/icons/CategoryIcon';
import Icon from 'FinanceBakerZ/src/icons/CustomIcons';

export default class AddCategory extends Component{


    constructor(){
        super();
        this.state = {

        };

    }
    renderCategoryIcons(){

        let categoryIcons = chunk(CategoryIconsName, 3);
        return categoryIcons.map((iconArray, i) => {
            return(
                <View style={SubCategoryStyles.categoryIcons} key={i}>
                    {iconArray.map((icon, index) => {
                        let icon_name = icon.value.replace('icon-' , "");
                        return(
                            <TouchableOpacity style={SubCategoryStyles.categoryIconsDiv} activeOpacity={0.75} key={index}>
                                <CategoryIconShow name={icon_name } size={60}/>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            );
        });
    }
    render(){
        return(
            <ViewContainer style = {SubCategoryStyles.addCategoryMain}>
                <Image source = {require('FinanceBakerZ/src/images/app-background.png')} style={SubCategoryStyles.backgroundImage}>
                    <ViewContainer  style = {SubCategoryStyles.addCategoryContainer}>
                        <View style={SubCategoryStyles.categoryNameField}>
                            <KeyboardAvoidingView>
                                <TextInput
                                    placeholder='Enter Category Name'
                                    style={SubCategoryStyles.input}
                                    maxLength = {30}
                                    autoCorrect={false}
                                    underlineColorAndroid="transparent"
                                />
                            </KeyboardAvoidingView>
                        </View>

                    </ViewContainer>
                    <View style={SubCategoryStyles.SelectCategoryIcon}>
                        <View style={SubCategoryStyles.categorySelectionIcon}>
                            <Text style={[SubCategoryStyles.textBold, SubCategoryStyles.textLeft]}>{this.state.categoryIcons ? this.state.bank.categoryIcons : 'Select Icon'}</Text>
                            <Icon size={10} name="down-arrow" style={SubCategoryStyles.iconRight} />
                        </View>
                    </View>
                    <View style={SubCategoryStyles.CategoryIconList}>
                        <ScrollView>
                            <TouchableOpacity>
                                <View>
                                    {this.renderCategoryIcons()}
                                </View>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                    <View style={SubCategoryStyles.iconParent}>
                        <View style={SubCategoryStyles.categorySelectionIcon}>
                            <Text style={[SubCategoryStyles.textBold, SubCategoryStyles.textLeft]}>{this.state.categoryIcons ? this.state.bank.categoryIcons : 'Select Parent Category'}</Text>
                            <Icon size={10} name="down-arrow" style={SubCategoryStyles.iconRight} />
                        </View>
                    </View>

                </Image>

            </ViewContainer>
        );
    }
}