import React, { Component }  from 'react'
import {
    View,
    Text,
    StatusBar,
    Image,
    ListView,
    TouchableOpacity
} from 'react-native'
import profileStyle from '../../styles/profile'
import  PostItem from '../../components/home/post-item'
import Actions from '../../store/actions'
import { connect } from 'react-redux'

class Index extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            ds
        };
    }
    renderHeader = () => {
        const user = this.props.user.toJS()
        return (
            <View style={profileStyle.viewHeader}>
                <Image source = {{uri: user.avatar}} resizeMode="contain" style ={profileStyle.avatar} />
                <Text style={profileStyle.textNameHeader}>{user.name}</Text>
                <Text style={profileStyle.textButtonTop}>{user.city}</Text>
                <Text style={profileStyle.textBioHeader}>{user.intro}</Text>

                <View style={{flexDirection:'row',alignItems:'center', justifyContent:'center'}}>
                    <View style ={profileStyle.buttonTop}>
                        <Image style ={profileStyle.imageButtonTop} source={icons.ic_boy}/>
                        <Text style={profileStyle.textButtonTop}>Sơ sinh</Text>
                    </View>

                    <View style ={profileStyle.buttonTop}>
                        <Image style ={profileStyle.imageButtonTop} source={icons.ic_girl}/>
                        <Text style={profileStyle.textButtonTop}>Sơ sinh</Text>
                    </View>

                    <View style ={profileStyle.buttonTop}>
                        <Image style ={profileStyle.imageButtonTop} source={icons.ic_boy}/>
                        <Text style={profileStyle.textButtonTop}>Đang dậy thì</Text>
                    </View>

                </View>
            </View>
        )
    }
    renderPostItem = (data) => {
        return <PostItem {...data}/>
    }
    logout = () => {
        this.props.dispatch(Actions.logout())
        this.props.dispatch(Actions.updateUser({}))
    }
    render () {
        const listPost = this.props.postList.toJS()
        const dataSource = this.state.ds.cloneWithRows(listPost)
        return (
            <View style={profileStyle.container}>
                <StatusBar
                    barStyle="light-content"/>

                <View style={profileStyle.actionBar}>
                    <TouchableOpacity onPress={this.logout}>
                        <Text style={[profileStyle.textActionBar, {textAlign:'left'}]}>Logout</Text>
                    </TouchableOpacity>
                    <Text style={[profileStyle.textActionBar, {textAlign:'center', marginLeft: 70}]}>Profile</Text>
                    <Text style={[profileStyle.textActionBar, {textAlign:'right'}]}>Setting</Text>
                </View>

                <ListView
                    renderHeader={this.renderHeader}
                    enableEmptySections={true}
                    dataSource={dataSource}
                    renderRow={this.renderPostItem}/>
            </View>
        )
    }
}

const mapStateToProps = state => ({...state})
const mapDispatchToProps = dispatch => ({dispatch})

export default connect(mapStateToProps, mapDispatchToProps)(Index)