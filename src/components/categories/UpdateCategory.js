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
import {I18n, showAlert, capitalizeFirstLetter } from 'FinanceBakerZ/src/customLibrary';
import { NavigationActions } from 'react-navigation'
import _ from 'underscore';



class UpdateCategory extends Component{

  constructor(props){
    super(props);
    let {_id, name, icon} = props.navigation.state.params;
    let parent = null;
    if(props.children){
      parent = props.children.parent;
    }
    this.state = {
      _id : _id,
      parent: parent,
      renderCategoryIcon: this.renderCategoryIcon(),
      name : name,
      icon: this.findCategoryIcon(icon) || null
    };
    this.deleteCategoryDialog = this.deleteCategoryDialog.bind(this);
  }


  componentDidMount() {
    this.props.navigation.setParams({ submit: this.deleteCategoryDialog }); // setting submit function from Routes to this.submit function
  }

  findCategoryObjToRemove(){
    const {_id, name, parent} = this.state;
    let { children } = this.props.category;
    let ids = [], names = [];
    children.map((catName) =>{
      //get all ids of children for backend
      if(_.values(children).length && catName.id){
        ids.push(catName.id)
      }
      //fall back for old categories
      else{
        names.push(catName)
      }
    });
    if(!parent){
      return {
        category: {
          _id,
          name,
          parent,
          ids,
          names
        }
      }
    }
    return {
      category: {
        name,
        _id
      }
    }
  }

  deleteCategory(){
    const {parent} = this.state;
    let removeCategory = parent === null ? 'categories.remove' : 'categories.removeFromParent';

    Meteor.call(removeCategory, this.findCategoryObjToRemove() , (err, response) => {
      if(err){
        showAlert('Error', err.reason)
      }else{
        showAlert('Success', 'Category has been deleted.');
        if(parent !== null){
          this.props.navigation.goBack();
        }else{
          const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: 'Categories'})
            ]
          });
          this.props.navigation.dispatch(resetAction);
        }
      }
    });
  }

  deleteCategoryDialog(){
    showAlert('REMOVE CATEGORY',
      'This will remove your all data \nAre you sure to remove your category?',
      [
        {text: 'Go Back'},
        {text: 'Yes, Remove', onPress: () => this.deleteCategory(), style: 'cancel'}
      ]
    );
  }



  componentWillReceiveProps(props){
    if(props.children){
      this.setState({
        icon: this.findCategoryIcon(props.children.icon),
        _id: props.children._id
      });
    }
  }

  findCategoryIcon(iconName){
    return CategoryIconsName.find((category) => category.value === iconName);
  }

  submit(){
    let {_id, name, icon, parent} = this.state;
    if(name && icon){
      icon = icon.value;
      Meteor.call('categories.update',{
        category: {
          name,
          icon,
          parent,
          _id
        }
      }, (err, response) => {
        if(response){
          showAlert('Success', 'Your category has been Updated.');
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

  onParentChange(parentId){
    let { categories} = this.props, parentCategory = null;
    let parent = categories.find(category =>  category._id === parentId);
    if(parent) {
      parentCategory = {
        name: parent.name,
        id: parent._id
      }
    }
    this.setState({
      parent: parentCategory
    })
  }

  getParentCategory(){
    let { parent } = this.state;
    let categories = this.props.categories;
    let category = categories.map((categoryParent, i) =>  <Picker.Item key={i} label={categoryParent.name} value={i === 0 ? '' : categoryParent._id} />);
    return(
      <Picker
          style={SubCategoryStyles.picker}
          selectedValue={parent && parent.id}
          onValueChange={this.onParentChange.bind(this)}>
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
    let children = [];
    if(this.props.category) {
      children = this.props.category.children;
    }
    return(
      <ViewContainer style = {SubCategoryStyles.addCategoryMain}>
        <Image source = {require('FinanceBakerZ/src/images/app-background.png')} style={SubCategoryStyles.backgroundImage}>
          <View style = {SubCategoryStyles.addCategorySub}>
            <ViewContainer  style = {SubCategoryStyles.addCategoryContainer}>
              <View style={SubCategoryStyles.categoryNameField}>
                <View style={SubCategoryStyles.labelContainer}>
                  <Text style={SubCategoryStyles.selectParentText}>{I18n("CATEGORIES_CATEGORY_NAME")}</Text>
                </View>
                <KeyboardAvoidingView behavior={'padding'}>
                  <TextInput
                      placeholder='Enter Category Name'
                      style={SubCategoryStyles.input}
                      maxLength = {30}
                      autoCorrect={false}
                      underlineColorAndroid="transparent"
                      value={this.state.name}
                      onChangeText={name => this.setState({name})}
                  />
                </KeyboardAvoidingView>
              </View>
            </ViewContainer>
            <View style={SubCategoryStyles.SelectCategoryIcon}>
              <View style={SubCategoryStyles.categorySelectLabel}><Text style={SubCategoryStyles.selectParentText}>{I18n("CATEGORIES_CATEGORY_ICON")}</Text></View>
              <View style={SubCategoryStyles.categorySelectionIcon}>
                <Text style={[SubCategoryStyles.textBold, SubCategoryStyles.textLeft]}>{this.state.icon ? capitalizeFirstLetter(this.state.icon.label) : 'Select Icon'}</Text>
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
            {!children.length ?
              <View style={SubCategoryStyles.iconParent}>
                {(Platform.OS !== 'ios') ?
                    <View style={SubCategoryStyles.SelParentCategoryLabel}>
                      <Text style={SubCategoryStyles.selectParentText}>{I18n("CATEGORIES_PARENT_CATEGORY")}</Text>
                      {this.getParentCategory()}
                    </View>
                    :
                    <TouchableOpacity style={SubCategoryStyles.ParentCategory} activeOpacity={0.75}
                                      onPress={() => this.refs.modal.open()}>
                      <Text style={[SubCategoryStyles.textBold, SubCategoryStyles.textLeft]}/>
                      <View style={SubCategoryStyles.categorySelectionParentIcon}>
                        <Text style={[SubCategoryStyles.textBold, SubCategoryStyles.textLeftUrdu]}>{this.state.parent || 'Select Parent Category'}</Text>
                        <Icon size={10} name="down-arrow" style={SubCategoryStyles.iconRight}/>
                      </View>
                    </TouchableOpacity>
                }
              </View>
              : <View/>
            }
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
export default createContainer((props) => {
  const categoriesHandle = Meteor.subscribe('categories');
  let { childId, _id, categoryId} = props.navigation.state.params;
  let categories =  Meteor.collection('categories').find({
    parent: null
  }, {sort: {createdAt: -1}});
  categories = categories.filter((category) => {
    return category._id !== categoryId
  });
  categories.unshift({name: 'No Parent Category'});
  let children = Meteor.collection('categories').findOne({_id: childId});
  let category = Meteor.collection('categories').findOne({_id: categoryId});
  return {
    categoriesReady: categoriesHandle.ready(),
    categories,
    children,
    category
  };
}, UpdateCategory);