
import React, { Component }  from 'react'
import {
    View,
    Text,
    Dimensions,
    Image,
    TouchableOpacity,
} from 'react-native'
import colors  from '../../styles/colors'
import dimens  from '../../styles/dimens'
import icons from '../../styles/icons'
var {height, width} = Dimensions.get('window');
var data;
class SearchItem extends Component {
    constructor(props){
        super(props);
    }
    clickItemSearchPlace =()=>{
        this.props.navigation.navigate('NewPost', {place:data})
    }
    render () {
        console.log('data post - ' + JSON.stringify(this.props.post))
        data = this.props.post;
        let img = icons.ic_restaurant;

        return (
            <TouchableOpacity onPress = {this.clickItemSearchPlace} style={{width:width, borderBottomWidth:0.3, borderColor:colors.divider_color}}>
                <View style={{flex:1, flexDirection:'row', marginTop:8}}>
                    <Image source = {img} resizeMode="contain" style ={{height:38, width:38, borderRadius:8, margin:10, marginTop:8}} />
                    <View style={{flex:1}}>
                        <View style={{ flexDirection:'row', marginLeft:5, marginTop:5, alignItems:'center'}}>
                            <Text style={{color:colors.description_text_color, fontSize:dimens.text_description}}>{data.item.name}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

export default SearchItem