import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Main from './src/components/main'
import { Provider } from 'react-redux'
import store from './src/store/store'

export default class KidGround extends Component {

    render() {
        return (
            <Provider store={store}>
                <Main />
            </Provider>
        )
    }
}
AppRegistry.registerComponent('KidGround', () => KidGround);
