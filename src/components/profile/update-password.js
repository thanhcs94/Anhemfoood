import React, { Component }  from 'react'

class UpdatePassword extends Component {
    render () {
         return (
            <View>
                <Text>Update Password</Text>
            </View>
        )
    }
}

const mapStateToProps = state => ({...state})
const mapDispatchToProp = dispatch => ({dispatch})

export default connect(mapStateToProps, mapDispatchToProp)(UpdatePassword)