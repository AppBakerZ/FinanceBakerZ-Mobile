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
        return(

            <ViewContainer>
                <Image source={require('FinanceBakerZ/src/images/app-background.png')} style={SubCategoryStyles.backgroundImage}>
                    <ScrollView style={{flex:1}}>
                        <View style={SubCategoryStyles.mainDiv}>
                            <View style={SubCategoryStyles.main}>
                                <Image source={require('FinanceBakerZ/src/images/category/img1.png')} style={SubCategoryStyles.Texture1}>
                                    <View style={SubCategoryStyles.child2}>
                                        <TouchableOpacity activeOpacity={0.3} style={{flex:1, flexDirection : 'row'}} >
                                            <CategoryIcon name ='icons_automobile' style={SubCategoryStyles.customIcon} size={80} />
                                            <Text  style={SubCategoryStyles.customIconText}>HEALTHCARE</Text>
                                        </TouchableOpacity>

                                    </View>
                                </Image>
                            </View>
                            <View  style={SubCategoryStyles.items}>
                                <Text  style={SubCategoryStyles.itemsText}>GASOLINE</Text>
                            </View>
                            <View  style={SubCategoryStyles.items}>
                                <Text  style={SubCategoryStyles.itemsText}>MAINTENACE</Text>
                            </View>
                            <View  style={SubCategoryStyles.items}>
                                <Text  style={SubCategoryStyles.itemsText}>REPAIRING</Text>
                            </View>
                            <View  style={SubCategoryStyles.items}>
                                <Text  style={SubCategoryStyles.itemsText}>LOAN PAYMENT</Text>
                            </View>
                            <View  style={SubCategoryStyles.items}>
                                <Text  style={SubCategoryStyles.itemsText}>GASOLINE</Text>
                            </View>
                            <View  style={SubCategoryStyles.items}>
                                <Text  style={SubCategoryStyles.itemsText}>MAINTENACE</Text>
                            </View>
                            <View  style={SubCategoryStyles.items}>
                                <Text  style={SubCategoryStyles.itemsText}>REPAIRING</Text>
                            </View>
                            <View  style={SubCategoryStyles.items}>
                                <Text  style={SubCategoryStyles.itemsText}>LOAN PAYMENT</Text>
                            </View>
                            <View  style={SubCategoryStyles.items}>
                                <Text  style={SubCategoryStyles.itemsText}>GASOLINE</Text>
                            </View>
                            <View  style={SubCategoryStyles.items}>
                                <Text  style={SubCategoryStyles.itemsText}>MAINTENACE</Text>
                            </View>
                            <View  style={SubCategoryStyles.items}>
                                <Text  style={SubCategoryStyles.itemsText}>REPAIRING</Text>
                            </View>
                            <View  style={SubCategoryStyles.items}>
                                <Text  style={SubCategoryStyles.itemsText}>LOAN PAYMENT</Text>
                            </View>

                            </View>
                    </ScrollView>
                </Image>
            </ViewContainer>
        )
    }
}