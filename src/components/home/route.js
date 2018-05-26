import { StackNavigator } from 'react-navigation';
import PostList from './post-list'
import NewPost from '../newpost/newpost-ui'

const LoginRoute = StackNavigator({
    PostList: { screen: PostList },
    NewPost: { screen: NewPost }
}, {
    headerMode: 'none'
})

export default LoginRoute