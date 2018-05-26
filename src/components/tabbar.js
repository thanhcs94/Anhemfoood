import React, { Component }  from 'react'
import {
    View,
    Text,
    FlatList,
    Image
} from 'react-native'
import { TabNavigator } from 'react-navigation'
import PostList from './home/post-list'
import Map from './director/map'
import Search from './director/search'
import Notification from './notification/index'
import Profile from './profile/index'
import colors from '../styles/colors'
import icons from '../styles/icons'
import tabbarStyle from '../styles/tabbar'

const ScreenStack = TabNavigator({
    Home: { screen: PostList,
             navigationOptions: {
                 tabBarLabel: 'Home',
                 tabBarIcon: ({tintColor}) => (
                     <Image
                         source={icons.tab_home_unselect}
                         style={[tabbarStyle.iconTabbar,{tintColor: tintColor}]}
                     />
                 ),
             }
    },
    Director: { screen: Map,
        navigationOptions: {
            tabBarLabel: 'Directory',
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={icons.tab_message_unselect}
                    style={[tabbarStyle.iconTabbar,{tintColor: tintColor}]}
                />
            ),
        }

    },
    Notification: { screen: Notification,
        navigationOptions: {
            tabBarLabel: 'Notification',
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={icons.tab_noti_unselect}
                    style={[tabbarStyle.iconTabbar,{tintColor: tintColor}]}
                />
            ),
        }

    },
    Profile: { screen: Profile,
        navigationOptions: {
            tabBarLabel: 'Profile',
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={icons.tab_profile_unselect}
                    style={[tabbarStyle.iconTabbar,{tintColor: tintColor}]}
                />
            ),
        }
    }
}, {
    tabBarOptions: {
        showIcon: true,
        style: {height: 50, padding:0, margin:0, paddingBottom:4},
        showLabel: true,
        tabStyle: {margin: 0, padding: 0, height: 60},
        indicatorStyle: {backgroundColor: colors.accent_color},
        activeTintColor: colors.accent_color,
    }
    , tabBarPosition: 'bottom',
})

export default ScreenStack