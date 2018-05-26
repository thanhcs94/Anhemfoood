import { StackNavigator } from 'react-navigation';
import Tabbar from './tabbar'
import NewPost from './newpost/newpost-ui'
import SearchPlace from './newpost/search-place'

const LoginRoute = StackNavigator({
    Tabbar: { screen: Tabbar },
    NewPost: { screen: NewPost },
    SearchPlace: { screen: SearchPlace}
}, {
    headerMode: 'none'
})
export default LoginRoute