import React, {Component} from 'react'
import {
    View,
    Text,
    FlatList,
    Image,
    StatusBar,
    ListView,
    TouchableOpacity,
    ActivityIndicator,
    RefreshControl
} from 'react-native'
import PostItem from './post-item'
import icons from '../../styles/icons'
import colors from '../../styles/colors'
import homeStyle from '../../styles/home'
import ImagePicker from 'react-native-image-picker'
import {connect} from 'react-redux'
import firebase from '../../apis/firebase'
import Actions from '../../store/actions'

class PostList extends Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.renderPostItem = this
            .renderPostItem
            .bind(this);
        this.state = {
            isLoading: true,
            refreshing: false,
            dataSource: this
                .ds
                .cloneWithRows([''])
        };
    }

    async componentWillMount() {
        let data = await firebase
            .getTimeline()
            .then((items) => {
                // this.setState({
                    this.props.dispatch(Actions.updatePostList(Object.values(items)))
                    this.setState({isLoading: false})
                    // dataSource: this
                    //     .ds
                    //     .cloneWithRows(items)
                // })
            });
    }

    renderPostItem = (post) => {
        console.log(post);
        return <PostItem {...post}/>
    }
    onClickNewPost = () => {
        this
            .props
            .switchScreen('new')
    }
    _onRefresh() {
        this.setState({refreshing: true});
        fetchData().then(() => {
        this.setState({refreshing: false});
        });
    }
    _pickImage = async() => {
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
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {

                // You can also display the image using data: let source = { uri:
                // 'data:image/jpeg;base64,' + response.data }; this.setState({ avatarSource:
                // source });
                this
                    .props
                    .navigation
                    .navigate('NewPost', {image: response})
            }
        });
    };
    navigateNewPost = () => {
        this
            .props
            .navigation
            .navigate('NewPost')
    }

    render() {
        debugger
        const listPost = this.props.postList.toJS() || []
        const dataSource = this.state.dataSource.cloneWithRows(listPost)
        return (
            <View style={homeStyle.container}>
                <StatusBar barStyle="light-content"/>
                <View style={homeStyle.actionBar}>
                    <Text
                        style={[
                        homeStyle.textActionBar, {
                            textAlign: 'center'
                        }
                    ]}>Home</Text>
                </View>

                <View
                    style={{
                    flexDirection: 'row',
                    backgroundColor: colors.accent_color
                }}>
                    <TouchableOpacity onPress={this.navigateNewPost} style ={homeStyle.buttonTop}>
                        <Image style ={homeStyle.imageButtonTop} source={icons.ic_discussion}/>
                        <Text style={homeStyle.textButtonTop}>Discuss</Text>
                    </TouchableOpacity>

                    <TouchableOpacity  onPress={this.navigateNewSearch}  style ={homeStyle.buttonTop}>
                        <Image style ={homeStyle.imageButtonTop} source={icons.ic_review}/>
                        <Text style={homeStyle.textButtonTop}>Reviews</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this._pickImage} style ={homeStyle.buttonTop}>
                        <Image style ={homeStyle.imageButtonTop} source={icons.ic_photo}/>
                        <Text style={homeStyle.textButtonTop}>Photo</Text>
                    </TouchableOpacity>
                </View>
                {
                    this.state.isLoading
                    && (
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <ActivityIndicator
                                animating={this.state.animating}
                                style={[ {height: 80}]}
                                size="large"
                            />
                        </View>
                    )
                }
                {
                     !this.state.isLoading
                     && (
                        <ListView
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this._onRefresh.bind(this)}
                                />
                            }
                            enableEmptySections={true}
                            dataSource={dataSource}
                            renderRow={this.renderPostItem}/>
                     )
                }
                
            </View>
        )
    }
}

const mapStateToProps = (state, ownState) => ({
    ...state,
    ...ownState
})
const mapDispatchToProps = dispatch => ({dispatch})

export default connect(mapStateToProps, mapDispatchToProps)(PostList)