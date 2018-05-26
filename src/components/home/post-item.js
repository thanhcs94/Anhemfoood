
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
import icon  from '../../styles/icons'
var Lightbox = require('react-native-lightbox');
var {height, width} = Dimensions.get('window');

const post = {
    title: 'Khu vui chơi giải trí đầm trâu, 10 giờ trước',
    content: 'Các mẹ tham khảo 6 phương pháp chữa ho cho bé từ thiên nhiên này. Đảm bảo con vừa nhanh khỏi lại vừa an toàn. Cách thực hiện cực dễ, mẹ vụng đến mấy cũng áp dụng ngon ơ.',
    name: 'Thanh Nguyen'

}

class PostItem extends Component {
    render (post) {
         if(!this.props.id){
            return(<View/>)
        }
        let likes = this.props.likes;
        var img = this.props.images
                 && (
                    <Lightbox navigator={this.props.navigator} activeProps ={{flex:1, resizeMode: 'contain'}}>
                        <Image
                            style ={{resizeMode: 'cover',height:170, width:null, borderRadius:4, marginTop: 8}}
                            source = {{uri: this.props.images}}/>
                    </Lightbox>
                    )

        return (
            <View style={{width:width, borderBottomWidth:0.3, borderColor:colors.divider_color}}>
                <View style={{flex:1, flexDirection:'row', marginTop:8}}>
                    <View style={{flex:1}}>
                        <View style={{ flexDirection:'row', marginLeft:5, marginTop:5, alignItems:'center'}}>
                            <Image source = {icon.ic_avatar} resizeMode="contain" style ={{height:40, width:40, borderRadius:20, margin:8, marginTop:8}} />
                            <View style={{ flexDirection:'column', paddingLeft:dimens.space_small}}>
                                <Text style={{color:colors.title_text_color, fontWeight:'500', fontSize:dimens.text_title}}>{this.props.name}</Text>
                                <Text style={{color:colors.description_text_color,fontWeight:'200', fontSize:12}}>{this.props.title}</Text>
                            </View>
                        </View>
                        <View style={{ margin:5, marginRight:10, flexDirection:'column'}}>
                            <Text style={{color:colors.description_text_color,fontSize:13, fontWeight:'400'}}>{this.props.content}</Text>
                            {img}
                        </View>

                        <View style={{ marginTop:8, marginBottom:8, marginRight:16, flexDirection:'row', justifyContent:'flex-end'}}>

                            <TouchableOpacity  style ={{flexDirection:'row',justifyContent:'center', alignItems:'center'}}>
                                <Image source = {icon.ic_loop} resizeMode="contain" style ={{height:20, width:20, marginLeft:dimens.space_big}} />
                                <Text style={{color:colors.secondary_text_color,fontWeight:'300', fontSize:12, marginLeft:8}}>{Math.floor(Math.random() * 100 + 1)}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=>this.spring(x)} style ={{flexDirection:'row',justifyContent:'center', alignItems:'center'}}>
                                <Image style ={{height:22, width:22, marginLeft:dimens.space_big}} source={icon.ic_hearted}/>
                                <Text style={{color:colors.secondary_text_color,fontWeight:'300', fontSize:12, marginLeft:8}}>{likes.length}</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </View>
            </View>
        )
    }
}

export default PostItem