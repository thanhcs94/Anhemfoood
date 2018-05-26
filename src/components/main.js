import React, { Component }  from 'react'
import {
    View,
    Text,
    AsyncStorage
} from 'react-native'
import Login from './login/route'
import Route from './route'
import { connect } from 'react-redux'
import Actions from '../store/actions'

class Main extends Component {
    constructor () {
        super()
        this.state = {
            isLoading: true
        }
    }
    updateLoadingState = (state) => {
        this.setState({isLoading: state})
    }
    componentDidMount () {
        this.props.loadUserFromStorage(this.updateLoadingState)
    }
    renderContent () {
        const user = this.props.user.toJS();
        if (user.id) {
            return (
                <Route />
            )
        }
        
        return <Login />
        // return <Tabbar />
    }
    render () {
        let content = null

        if (this.state.isLoading)
            content = <View><Text>Loading data</Text></View>
        else
            content = this.renderContent()

        return content
    }
}

const mapStateToProps = state => ({...state})
const mapDispatchToProps = dispatch => ({dispatch})

//stateProps => result returned from mapStateToProps
//dispatchProps => result returned from mapDispatchToProps
const mergeProps = (stateProps, dispatchProp) => ({
    ...stateProps,// pass all state to component
    async loadUserFromStorage (updateLoadingState) {
        try {
            let user = JSON.parse(await AsyncStorage.getItem('kidground::user'))
            if (!user || typeof user !== 'object')
                user = {}
            dispatchProp.dispatch(Actions.updateUser(user))
        } catch (ex) {
            console.log(ex)
        }

        updateLoadingState(false)
    }
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Main)