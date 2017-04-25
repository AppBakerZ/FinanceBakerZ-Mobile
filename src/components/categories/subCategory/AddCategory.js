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
        icon = icon.value;
        Meteor.call('categories.insert', {
            category: {
                name,
                icon,
                parent
            }
        }, (err, response) => {
            if(response){
                alert('success')
            }else{
                console.warn(err.reason)
            }

        });

    }

    getParentCategory(){
        let categories = this.props.categories;
        let category = categories.map((categoryParent, i) =>  <Picker.Item key={i} label={categoryParent.name} value={categoryParent.name}/>);
        return(
            <Picker
                selectedValue={this.state.parent}
                onValueChange={(parent) => this.setState({parent})}>
                {category}
            </Picker>
        );

    }
    renderCategoryIcon(){

        let categoryIcons = chunk(CategoryIconsName, 3);
        return categoryIcons.map((iconArray, i) => {
            return(
                <View style={SubCategoryStyles.categoryIcons} key={i}>
                    {iconArray.map((icon, index) => {
                        let icon_name = icon.value.replace('icon-' , "");
                        return(
                            <TouchableOpacity style={SubCategoryStyles.categoryIconsDiv} onPress={() => this.setState({icon})} activeOpacity={0.75} key={index}>
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
                                    <TextInput
                                        placeholder='Enter Category Name'
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
                            <View style={SubCategoryStyles.categorySelectionIcon}>
                                <Text style={[SubCategoryStyles.textBold, SubCategoryStyles.textLeft]}>{this.state.icon ? this.state.icon.label : 'Select Category Icon'}</Text>
                                <Icon size={10} name="down-arrow" style={SubCategoryStyles.iconRight} />
                            </View>
                        </View>
                        <View style={SubCategoryStyles.CategoryIconList}>
                            <ScrollView>
                                <TouchableOpacity>
                                    <View>
                                        {this.state.renderCategoryIcon}
                                    </View>
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                        <View style={SubCategoryStyles.iconParent}>
                            {(Platform.OS !== 'ios') ? <View><Text>Select Parent Category</Text>{this.getParentCategory()}</View> :
                                <TouchableOpacity style={SubCategoryStyles.ParentCategory} activeOpacity={0.75}
                                                  onPress={() => this.refs.modal.open()}>
                                    <Text style={[SubCategoryStyles.textBold, SubCategoryStyles.textLeft]}>a</Text>
                                    <View style={SubCategoryStyles.categorySelectionParentIcon}>
                                        <Text style={[SubCategoryStyles.textBold, SubCategoryStyles.textLeft]}>{this.state.categoryIcons ? this.state.categoryIcons : 'Select Parent Category'}</Text>
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
    return {
        categoriesReady: categoriesHandle.ready(),
        categories: Meteor.collection('categories').find({
            parent: null
        }, {sort: {createdAt: -1}})
    };
}, AddCategory);