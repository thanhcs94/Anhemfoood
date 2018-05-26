import React, { Component }  from 'react'
import {
    View,
    Text
} from 'react-native'
import Login from './login'
import Register from './register'
import loginStyle from '../../styles/login'
import { connect } from 'react-redux'
import firebase from '../../apis/firebase'
import Actions from '../../store/actions'

class MainLoginScreen extends Component {
    constructor () {
        super()
        this.state = {
            screen: 'login'
        }
    }
    slideUpForm () {

    }
    switchScreen = (screen = 'login') => {
        //do animation before and after switch screen 
        // this.slideUpForm()
        this.setState({screen})
        // this.slideDownForm()
    }
    getScreen () {
        let view = null,
            props = {
                updateUserState: this.props.updateUserState,
                checkExistEmail: this.props.checkExistEmail,
                switchScreen: this.switchScreen,
                insertUser: this.props.insertUser.bind(this.props)
            }

        if (this.state.screen === 'login')
            view = <Login {...props} />
        else
            view = <Register {...props} />

        return view
    }
    render () {
        return (
            <View style={loginStyle.container}>
                {this.getScreen()}
            </View>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({...state, ...ownProps})
const mapDispatchToProps = dispatch => ({
    dispatch,
    checkExistEmail (email) {
       return firebase.getUsersByEmail(email)
                .then(users => {
                    for(let id in users) {
                        users[id].id = id
                        return users[id]
                    }
                })
                .catch (err => {
                    console.log(err)
                })
    },
})

const mergeProps = (stateProps, dispatchProps) => ({
    ...stateProps,
    ...dispatchProps,
    updateUserState (user) {
        dispatchProps.dispatch(Actions.updateUser(user))
        dispatchProps.dispatch(Actions.storeUser(user))
    },
    insertUser (user) {
        const userId =  Date.now()
        return firebase.insertUser(userId, user)
                    .then(user => {
                        user.id = userId
                        // this.updateUserState(user)
                        stateProps.navigation.navigate('BasicSettings', {
                            user,
                            updateUserState: this.updateUserState
                        })
                        return true
                    })
    },
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(MainLoginScreen)