import React, { Component }  from 'react'
import {
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    FlatList
} from 'react-native'
import homeStyle from '../../styles/home'
import NotiItem from './noti-item'
class Index extends Component {

    renderNotiItem = (post) => {
        return <NotiItem post={post} />
    }

    render () {
        return (
            <View style={homeStyle.container}>
                <StatusBar
                    barStyle="light-content"/>
                <View style={homeStyle.actionBar}>
                    <Text style={[homeStyle.textActionBar, {textAlign:'center'}]}>Notification</Text>
                </View>

                <FlatList
                    data={[{key: 'post1'}, {key: 'post2'}]}
                    renderItem={this.renderNotiItem}/>

            </View>
        )
    }
}

export default Index