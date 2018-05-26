
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
var {height, width} = Dimensions.get('window');

class NotiItem extends Component {
    render () {

        return (
            <View style={{width:width, borderBottomWidth:0.3, borderColor:colors.divider_color}}>
                <View style={{flex:1, flexDirection:'row', marginTop:8}}>
                    <Image source = {require('../../resource/ic_logo.png')} resizeMode="contain" style ={{height:38, width:38, borderRadius:8, margin:10, marginTop:8}} />
                    <View style={{flex:1}}>
                        <View style={{ flexDirection:'row', marginLeft:5, marginTop:5, alignItems:'center'}}>
                            <Text style={{color:colors.description_text_color, fontSize:dimens.text_description}}>Đây là trang thông báo cho người dùng, nhận thông báo khi có người </Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default NotiItem