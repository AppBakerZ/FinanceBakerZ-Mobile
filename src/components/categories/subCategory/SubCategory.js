import React, { Component, PropTypes } from 'react';
import { View, Text, Image, ScrollView, Icon, TouchableOpacity} from 'react-native';
import { SubCategoryStyles } from 'FinanceBakerZ/src/components/categories/subCategory/SubCategoryStyle';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import CategoryIcon from 'FinanceBakerZ/src/icons/CategoryIcon';
import FabButton from 'FinanceBakerZ/src/components/button/FabButton';

import Meteor, { createContainer } from 'react-native-meteor';

class SubCategory extends Component {



  constructor(props) {
    super(props);
    this.state = {};
  }
  renderSubCategory(child) {

    let {name, _id, children} = this.props.subCategories;
    if(child.length){
      return child.map((val, i) => {
        return(
            <TouchableOpacity key={i} activeOpacity={0.75} onPress={() => this.props.navigation.navigate('UpdateCategory', {_id, name: children[i].name, childId: children[i].id})} style={SubCategoryStyles.SubcategoryTouchable}>
              <View style={SubCategoryStyles.subCategoryChildren}>
                <Text style={SubCategoryStyles.categoryChildren}>{val.name.toUpperCase()}</Text>
              </View>
            </TouchableOpacity>
        )})
    }else{
      return <View style={[SubCategoryStyles.subCategoryChildren, SubCategoryStyles.noCategoryChildren]}><Text style={SubCategoryStyles.categoryChildren}>No categories</Text></View>
    }
  }
  render(){
    console.log('==>subCategories', this.props.subCategories);

    if(this.props.subCategories){
      let {icon, name, _id} = this.props.subCategories;
      let { subCategories } = this.props;
      let {navigate} = this.props.navigation;
      let { children } = subCategories;

      let iconName = subCategories.icon.replace('icon-' , "");
      return(
          <ViewContainer>
            <Image source={require('FinanceBakerZ/src/images/app-background.png')} style={SubCategoryStyles.backgroundImage}>
              <ScrollView style={SubCategoryStyles.scroll}>
                <View style={SubCategoryStyles.mainDiv}>
                  <View style={SubCategoryStyles.main}>
                    <Image source={require('FinanceBakerZ/src/images/category/img1.png')} style={SubCategoryStyles.Texture1}>
                      <View style={SubCategoryStyles.child2}>
                        <TouchableOpacity activeOpacity={0.75} onPress={() => this.props.navigation.navigate('UpdateCategory',{icon, name, _id})} style={SubCategoryStyles.touchableOpacity} >
                          <CategoryIcon  style={SubCategoryStyles.customIcon} name={iconName} size={50}/>
                          <Text style={SubCategoryStyles.customIconText}>{subCategories.name.toUpperCase()}</Text>
                        </TouchableOpacity>
                      </View>
                    </Image>
                  </View >
                  {this.renderSubCategory(children)}
                </View>
              </ScrollView>
            </Image>
            {!this.state.loading ? <FabButton iconName="add" iconColor="#fff" style={SubCategoryStyles.fabButtonBg} onPress={() => navigate('AddCategory')} /> : <Text></Text>}
          </ViewContainer>
      )
    }else {
      return <View></View>
    }

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