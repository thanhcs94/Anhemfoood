import React, { Component }  from 'react'
import {
    View,
    Text,
    FlatList,
    Image,
    StatusBar,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
class NewPost extends Component {

    constructor(props) {
        super(props);
    }

    render () {
         return (
            <View>
                <Text>Create new Post</Text>
            </View>
        )
    }
}
const mapStateToProps = state => ({...state})
const mapDispatchToProp = dispatch => ({dispatch})

export default connect(mapStateToProps, mapDispatchToProp)(NewPost)