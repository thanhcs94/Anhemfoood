import React, { Component }  from 'react'
import {
    View,
    Text,
    StatusBar,
    Image,
    FlatList,
    TextInput,
    TouchableOpacity
} from 'react-native'
import settingStyle from '../../styles/setting'
import {connect} from 'react-redux'
import firebase from '../../apis/firebase'

class BasicSettings extends Component {
    constructor () {
        super()
        this.state = {

        }
    }
    updateValue = (evt) => {
        this.setState({[evt.target.name]: evt.target.value})
    }
    backToMain = () => {
        this.props.navigation.pop()
    }
    updateUser = () => {
        const { user, updateUserState } =  this.props.navigation.state.params;
        this.props.updateUser(user.id, this.state, () => updateUserState({...user, ...this.state}))
    }
    render () {
        const { user } =  this.props.navigation.state.params;
         return (
             <View style={settingStyle.container}>
                <StatusBar
                    barStyle="light-content"/>

                <View style={settingStyle.actionBar}>
                <Text style={[settingStyle.textActionBar, {textAlign:'center', marginLeft:120}]}>Edit Profile</Text>
                <TouchableOpacity onPress={this.updateUser}>
                    <Text style={[settingStyle.textActionBar, {textAlign:'right'}]}>Save</Text>
                </TouchableOpacity>
                </View>

                <View style={settingStyle.viewHeader}>
                    <Text style={settingStyle.textButtonTop}>Hãy chia sẻ một chút về thông tin cá nhân và những đứa trẻ trong gia đình của bạn.</Text>
                    <Image source = {{uri: user.avatar}} resizeMode="contain" style ={settingStyle.avatar} />
                </View>

               <View style={settingStyle.viewContent}>
                    <Text style={settingStyle.textButtonTop}>Tên</Text>
                    <TextInput
                    style={{height: 25, fontSize:15}}
                    multiline
                    defaultValue={user.name}
                    onChangeText={(name) => this.setState({name})}/>
                </View>
                     <View style={settingStyle.viewContent}>
                         <Text style={settingStyle.textButtonTop}>City</Text>
                         <TextInput
                             style={{height: 25, fontSize:15}}
                             multiline
                             name="city"
                             defaultValue={user.city}
                             onChangeText={text => this.setState({city: text})}
                             placeholder = "Ho chi Minh, vn"/>
                     </View>
                <View style={settingStyle.viewContent}>
                    <Text style={settingStyle.textButtonTop}>City</Text>
                    <TextInput
                        style={{height: 25, fontSize:15}}
                        multiline
                        placeholder='Thành phố của bạn'
                        onChangeText={(city) => this.setState({userCity:city})}/>
                 </View>

                <View style={settingStyle.viewContent}>
                    <Text style={settingStyle.textButtonTop}>Giới thiệu</Text>
                    <TextInput
                    style={{height: 25, fontSize:15}}
                    multiline
                    placeholder='Lời chào của bạn'
                    onChangeText={(intro) => this.setState({userIntro:intro})}/>
            </View>

                <View style={{flexDirection:'column', margin:16}}>
                    <Text style={settingStyle.textButtonTop}>Những đứa trẻ của bạn</Text>
                    <View style ={settingStyle.buttonTop}>
                        <Image style ={settingStyle.imageButtonTop} source={icons.ic_boy}/>
                        <Text style={settingStyle.textButtonTop}>Sơ sinh</Text>
                    </View>

                    <View style ={settingStyle.buttonTop}>
                        <Image style ={settingStyle.imageButtonTop} source={icons.ic_daughter}/>
                        <Text style={settingStyle.textButtonTop}>Đang dậy thì</Text>
                    </View>

                    <TouchableOpacity style ={{flexDirection:'row', alignItems:'center', marginTop:16, borderRadius:4, borderWidth:1, borderColor:'#cccccc'}}>
                        <Image style ={settingStyle.imageButtonTop} source={icons.ic_write}/>
                        <Text style={settingStyle.textButtonTop}>Thêm đứa con nữa</Text>
                    </TouchableOpacity>

                </View>
         </View>

        )
    }
}

const mapStateToProps = (state) => ({...state})
const mapDispatchToProp = dispatch => ({
    dispatch,
    updateUser (userId, info, cb) {
        
        firebase.updateUser(userId, info, cb)
    }
})

export default connect(mapStateToProps, mapDispatchToProp)(BasicSettings)