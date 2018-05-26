import React, { Component }  from 'react'
import {
    View,
    Text,
    StatusBar,
    Image,
    FlatList,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    TouchableOpacity
} from 'react-native'
import newPostStyle from '../../styles/newpost'
import icons from '../../styles/icons'
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux'
import Actions from '../../store/actions'

class NewPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            images: '',
            place:''
        }
    }
    _gotoSearchScreen = () => {
        this.props.navigation.navigate('SearchPlace')
    }

    _pickImage = async () => {
        var options = {
            title: 'Select Image',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                this.setState({
                    images: response.uri
                });
            }
        });
    };
    componentDidMount () {
        const params = this.props.navigation.state.params || {}
        let images = params.image || {}
        this.setState({images: images.uri})
        let place = params.place|| {item:{}}
        this.setState({place:place.item.name})
    }
    goback = () => {
        this.props.navigation.goBack()
    }
    addPost = () => {
        this.props.addPost(this.state)
    }
    render () {
        let image = null
        try {
            image = this.props.navigation.state.params
        } catch (ex) {

        }
        const user = this.props.user.toJS()

        return (
            <View style={newPostStyle.container}>
                <StatusBar
                    barStyle="light-content"/>

                <View style={newPostStyle.actionBar}>
                    <TouchableOpacity onPress={this.goback}>
                        <Text style={[newPostStyle.textActionBar, {textAlign:'left'}]}>Back</Text>
                    </TouchableOpacity>
                    <Text style={[newPostStyle.textActionBar, {textAlign:'center'}]}>Write Post</Text>
                    <TouchableOpacity onPress={this.addPost}>
                        <Text
                            style={[newPostStyle.textActionBar, {textAlign:'right'}]}>Post</Text>
                    </TouchableOpacity>
                </View>

                <View style={newPostStyle.viewHeader}>
                        <Image source = {require('../../resource/ic_logo.png')} resizeMode="contain" style ={newPostStyle.avatar} />

                        <View style={{flexDirection:'column'}}>
                            <Text style={newPostStyle.textNameHeader}>{user.name}</Text>
                            <View style={{flexDirection:'row'}}>
                                <Text style={newPostStyle.textNameHeader}>{this.state.place}</Text>
                            </View>
                        </View>
                </View>
                <View style={newPostStyle.textContainer}>
                    <KeyboardAvoidingView behavior = "padding">

                        <TextInput
                            style={{height: 100, fontSize:16}}
                            multiline
                            onChangeText={text => this.setState({content: text})}
                            placeholder = "Hỏi hoặc chia sẻ điều gì đó với các phụ huynh quanh bạn"
                        />

                    </KeyboardAvoidingView>
                    <Image source={{uri: this.state.images}} resizeMode="cover" style={newPostStyle.photoSelect}/>
                </View>

                      <View style={[newPostStyle.bottomContainer,{flexDirection:'row',alignItems:'center', justifyContent:'center'}]}>
                        <TouchableOpacity onPress ={this._gotoSearchScreen} style ={newPostStyle.buttonTop}>
                            <Image style ={newPostStyle.imageButtonTop} source={icons.ic_review}/>
                            <Text style={newPostStyle.textButtonTop}>Địa điểm</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress = {this._pickImage} style ={newPostStyle.buttonTop}>
                            <Image style ={newPostStyle.imageButtonTop} source={icons.ic_photo}/>
                            <Text style={newPostStyle.textButtonTop}>Hình ảnh</Text>
                        </TouchableOpacity>

                     </View>
            </View>
        )
    }
}


const mapStateToProps = (state, ownState) => ({...state, ...ownState})
const mapDispatchToProp = dispatch => ({dispatch})
const mergeProps = (stateProps, dispatchProps) => ({
    ...stateProps,
    addPost (post) {
        const user = stateProps.user.toJS()
        post.name = user.name
        post.id = Date.now()
        post.likes = Math.floor(Math.random() * 1000 + 1)
        const posts = stateProps.postList.toJS() || []
        posts.push(post)
        dispatchProps.dispatch(Actions.updatePostList(posts))
        stateProps.navigation.goBack()
    }
})

export default connect(mapStateToProps, mapDispatchToProp, mergeProps)(NewPost)
