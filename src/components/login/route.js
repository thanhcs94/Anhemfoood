import MainLoginIndex from './index'
import { StackNavigator } from 'react-navigation';
import BasicSettings from '../profile/basic-settings'

const LoginRoute = StackNavigator({
    Login: { screen: MainLoginIndex },
    BasicSettings: { screen: BasicSettings }
}, {
    headerMode: 'none'
})

export default LoginRoute