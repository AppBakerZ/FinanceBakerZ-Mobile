import React, { Component } from 'react';
import { View, Text, Image, ScrollView, Picker, Platform, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import { SubCategoryStyles } from 'FinanceBakerZ/src/components/categories/subCategory/SubCategoryStyle';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import {chunk} from 'FinanceBakerZ/src/customLibrary';
import CategoryIconsName from 'FinanceBakerZ/src/CategoryIconsName';
import CategoryIconShow from 'FinanceBakerZ/src/icons/CategoryIcon';
import Icon from 'FinanceBakerZ/src/icons/CustomIcons';
import Modal from 'react-native-modalbox';
import Meteor, { createContainer } from 'react-native-meteor';
import FabButton from 'FinanceBakerZ/src/components/button/FabButton';
import {I18n, showAlert} from 'FinanceBakerZ/src/customLibrary';


class AddCategory extends Component{

    constructor(props){
        super(props);
        this.state = {
            parent: '',
            renderCategoryIcon: this.renderCategoryIcon()
        };
    }
    submit(){
        let {name, icon, parent} = this.state;
        if(name && icon){
          icon = icon.value;

          Meteor.call('categories.insert', {
            category: {
                name,
                icon,
                parent
            }
        }, (err, response) => {
            if(response){
                showAlert('Success', 'Your category has been added.');
                this.props.navigation.goBack();
            }else{
                console.warn(err.reason)
            }
        });
        }else{
          showAlert('Warning', 'Category name and icon fields are required.');
        }

    }
    removeBorder(icon){
        if(icon.removeRightBorder) {
            return {borderRightColor: 'transparent', borderRightWidth: 0}
        }else if(icon.removeBottomBorder){
            return {borderBottomColor: 'transparent', borderBottomWidth: 0}
        }
    }
    setBorder(icon){
        return icon.map((font, index) => {

            index++;
            //delete pre keys if attach.
            delete font.removeRightBorder;
            delete font.removeBottomBorder;
            if(index % 3 == 0){
                font.removeRightBorder = true
            }
            let lastItems = icon.length % 3 == 0 ? 3 : icon.length % 3;
            if(index > icon.length - lastItems){
                font.removeBottomBorder = true
            }
            return font
        });
    }

    getParentCategory(){
        let categories = this.props.categories;
        let category = categories.map((categoryParent, i) =>  <Picker.Item key={i} label={categoryParent.name} value={i === 0 ? '' : categoryParent.name}/>);
        return(
            <Picker
                style={SubCategoryStyles.picker}
                selectedValue={this.state.parent}
                onValueChange={(parent) => this.setState({parent})}>
                {category}
            </Picker>
        );

    }
    renderCategoryIcon(){

        let CategoryFonts = this.setBorder(CategoryIconsName);
        let categoryIcons = chunk(CategoryFonts, 3);
        return categoryIcons.map((iconArray, i, arr) => {
            return(
                <View style={SubCategoryStyles.categoryIcons} key={i}>
                    {iconArray.map((icon, index ) => {
                        let icon_name = icon.value.replace('icon-' , "");
                        return(
                            <TouchableOpacity style={[SubCategoryStyles.categoryIconsDiv, this.removeBorder(icon) , arr.length-1 == i ? { borderBottomColor: 'transparent', borderBottomWidth: 0 } : '']} onPress={() => this.setState({icon})} activeOpacity={0.75} key={index}>
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
                    <View style = {SubCategoryStyles.addCategorySub}>
                        <ViewContainer  style = {SubCategoryStyles.addCategoryContainer}>
                            <View style={SubCategoryStyles.categoryNameField}>
                                <KeyboardAvoidingView>
                                    <View style={SubCategoryStyles.categoryNameLabel}>
                                        <Text style={SubCategoryStyles.selectParentText}>{I18n("CATEGORIES_CATEGORY_NAME")}</Text>
                                    </View>
                                    <TextInput
                                        placeholder={I18n("CATEGORIES_ENTER_CATEGORY_NAME")}
                                        style={SubCategoryStyles.input}
                                        maxLength = {30}
                                        autoCorrect={false}
                                        underlineColorAndroid="transparent"
                                        onChangeText={name => this.setState({name})}
                                    />
                                </KeyboardAvoidingView>
                            </View>

                        </ViewContainer>
                        <View style={SubCategoryStyles.SelectCategoryIcon}>
                            <View style={SubCategoryStyles.SelectCategoryIconLabel}>
                                <Text style={SubCategoryStyles.selectParentText}>{I18n("CATEGORIES_CATEGORY_ICON")}</Text>
                            </View>
                            <View style={SubCategoryStyles.categorySelectionIcon}>
                                <Text style={[SubCategoryStyles.textBold, SubCategoryStyles.textLeft]}>{this.state.icon ? this.state.icon.label : I18n("CATEGORIES_SELECT_CATEGORY_ICON")}</Text>
                                <Icon size={10} name="down-arrow" style={SubCategoryStyles.iconRight} />
                            </View>
                        </View>
                        <View style={SubCategoryStyles.CategoryIconList}>
                            <ScrollView>
                                <View>
                                    <TouchableOpacity>
                                        {this.state.renderCategoryIcon}
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </View>
                        <View style={SubCategoryStyles.iconParent}>
                            {(Platform.OS !== 'ios') ? <View><Text style={SubCategoryStyles.selectParentText}>{I18n("CATEGORIES_PARENT_CATEGORY")}</Text>{this.getParentCategory()}</View> :
                                <TouchableOpacity style={SubCategoryStyles.ParentCategory} activeOpacity={0.75}
                                                  onPress={() => this.refs.modal.open()}>
                                    <Text style={[SubCategoryStyles.textBold, SubCategoryStyles.textLeft]}></Text>
                                    <View style={SubCategoryStyles.categorySelectionParentIcon}>
                                        <Text style={[SubCategoryStyles.textBold, SubCategoryStyles.textLeft]}>{this.state.parent || 'Select Parent Category'}</Text>
                                        <Icon size={10} name="down-arrow" style={SubCategoryStyles.iconRight}/>
                                    </View>
                                </TouchableOpacity>
                            }
                        </View>
                        <View style={SubCategoryStyles.febButton}>
                            <FabButton iconName="check" iconColor="#fff" onPress={this.submit.bind(this)}/>
                        </View>
                    </View>
                    <Modal style={SubCategoryStyles.modal} position={"bottom"} ref={"modal"} swipeArea={20}>
                        <View style={SubCategoryStyles.renderListCon}>
                            {this.getParentCategory()}
                        </View>
                    </Modal>
                </Image>
            </ViewContainer>
        );
    }
}
export default createContainer(() => {
    const categoriesHandle = Meteor.subscribe('categories');
    let categories =  Meteor.collection('categories').find({
      parent: null
    }, {sort: {createdAt: -1}});
    categories.unshift({name: 'No Parent Category'});
    return {
        categoriesReady: categoriesHandle.ready(),
        categories
    };
}, AddCategory);