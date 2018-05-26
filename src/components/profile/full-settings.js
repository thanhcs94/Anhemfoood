import React, { Component }  from 'react'
import {
    View,
    Text,
    StatusBar,
    Image,
    FlatList
} from 'react-native'

class FullSettings extends Component {
    render () {
         return (
            <View>
                <Text>Full setting</Text>
            </View>
        )
    }
}

const mapStateToProps = state => ({...state})
const mapDispatchToProp = dispatch => ({dispatch})

export default connect(mapStateToProps, mapDispatchToProp)(FullSettings)