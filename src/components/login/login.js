import React, { Component }  from 'react'
import icons from '../../styles/icons'
import loginStyle from '../../styles/login'
import {
    AppRegistry,
    loginStyleheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    StatusBar,
    Keyboard,
    Image,
    ActivityIndicator,
    Animated,
    LayoutAnimation
} from 'react-native'
import { facebook } from 'react-native-simple-auth';
import auth from '../../apis/auth'
import { connect } from 'react-redux'
import firebase from '../../apis/firebase'
import Actions, { ActionNames } from '../../store/actions'
import md5 from 'crypto-js/md5'

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            paddingBottom: 0,
            content: '',
            timing: {
				logo: new Animated.Value(60)
			},
            bounceValue: {
				logo: new Animated.Value(1),
			}
        };
    }
    componentWillMount () {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardWillShow)
        this.keyboardDidShowListener = Keyboard.addListener('keyboardWillHide', this._keyboardWillHide)
    }
    _keyboardWillHide = () => {
        Animated.spring(this.state.bounceValue.logo, {toValue: 1}).start()
        Animated.timing(this.state.timing.logo, {toValue: 60}).start()
        this.setState({paddingBottom: 0})
    }
    _keyboardWillShow = () => {
        Animated.spring(this.state.bounceValue.logo, {toValue: 0.6}).start()
        Animated.timing(this.state.timing.logo, {toValue: -40}).start()
        this.setState({paddingBottom: 20})
    }
    componentWillUnmount () {
        this.keyboardDidShowListener.remove()
        this.keyboardDidShowListener.remove()
    }
    handleResult = ({status}) => {
        this.setState({isLoading: false})
        if (status === 'failed')
            alert('Login by Facebook failed!')
    }
    gotoRegister = () => {
        this.props.switchScreen('register')
    }
    doLoginByFB = () => {
        this.setState({isLoading: true})
        this.props.loginByFB(this.handleResult)
    }
    handleResult = ({status}) => {
        this.setState({isLoading: false})
        if (status === 'failed') {
            alert('Incorrect Email/Password')
        } else if (status === 'not_exists') {
            alert('Account has not been registered!')
        }
    }
    doLoginByEmail = () => {
        this.setState({isLoading: true})
        this.props.loginByEmail({
            email: this.state.email,
            password: this.state.password
        }, this.handleResult)
    }
    updatePassword = (password) => {
        this.setState({password})
    }
    updateEmail = (email) => {
        this.setState({email})
    }

    render () {
        return (
            <View style={loginStyle.container}>
                <StatusBar
                    barStyle = "light-content"
                />

                <KeyboardAvoidingView
                    behavior="position"
                    style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        paddingBottom: this.state.paddingBottom}}>
                    <Animated.View
                        style={[loginStyle.logoContainer, {
                            marginBottom: this.state.timing.logo,
                            transform: [                        // `transform` is an ordered array
				            	{scale: this.state.bounceValue.logo},  // Map `bounceValue` to `scale`
		          			]
                        }]}>
                        <Image
                            style = {loginStyle.logoImage}
                            source={icons.logo} />
                        <Text style = {[loginStyle.titleApp, {fontSize:30}]}>KidGround</Text>
                        <Text style = {[loginStyle.titleApp]}>Cùng bé yêu tận hưởng tuổi thơ</Text>
                    </Animated.View>

                    <TextInput
                        placeholder = "Tên đăng nhập hoặc email"
                        placeholderTextColor = '#cccccc'
                        returnKeyType="next"
                        keyboardType = "email-address"
                        autoCorrect = {false}
                        autoCapitalize = "none"
                        onChangeText={this.updateEmail}
                        onSubmitEditing = {()=> this.passwordInput.focus()}
                        style = {loginStyle.inputText}>
                    </TextInput>

                    <TextInput
                        placeholder ="Mật khẩu"
                        placeholderTextColor ='#cccccc'
                        secureTextEntry
                        returnKeyType="go"
                        onChangeText={this.updatePassword}
                        ref = {(input)=>this.passwordInput = input}
                        style = {loginStyle.inputText}>
                    </TextInput>

                    <TouchableOpacity style = {loginStyle.buttonLoginContainer} onPress = {this.doLoginByEmail}>
                        <Text style ={loginStyle.buttonLoginText}>Đăng nhập</Text>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={this.gotoRegister}>
                        <Text style={loginStyle.instructionsText}>Chưa có tài khoản?</Text>
                    </TouchableOpacity>

                    <View style={{flexDirection:'row', marginTop:20}}>
                        <TouchableOpacity style ={{flex:1}} onPress={this.doLoginByFB}>
                            <Text style={[loginStyle.instructionsText,{textAlign:'left'}]}>Đăng nhập facebook</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style ={{flex:1}} onPress={this.gotoRegister}>
                            <Text style={[loginStyle.instructionsText,{textAlign:'right'}]}>Quên mật khẩu</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
                {
                    this.state.isLoading
                    && (
                        <View
                            position='absolute'
                            style={{backgroundColor: 'black', justifyContent: 'center', alignItems:'center', opacity: 0.2, height: 700, width: 500}}>
                            <ActivityIndicator
                                color='white'
                                animating={this.state.animating}
                                style={[ {height: 80}]}
                                size="large"
                            />
                            </View>
                    )
                }
            </View>
        )
    }
}

const mapStateToProps = (state, ownState) => ({...state, ...ownState})
const mapDispatchToProps = dispatch => ({
    dispatch,
})

const mergeProps = (stateProps, dispatchProps) => ({
    ...stateProps,
    ...dispatchProps,
    loginByEmail (auth, cb) {
        firebase.getUsersByEmail(auth.email)
                .then(users => {
                    if (!users || typeof(users) !== 'object' || !Object.keys(users).length)
                        cb({status: 'not_exists'})
                    else {
                        for(let id in users) {
                            if (users[id].password === md5(auth.password).toString()) {
                                users[id].id = id
                                stateProps.updateUserState(users[id])
                            } else {
                                cb({status: 'failed'})
                            }
                        }
                    }
                })
    },
    loginByFB (cb) {
        facebook(auth.fb).then(info => {
            if (info.error) {
                throw new Error()
            }

            stateProps.checkExistEmail(info.user.email)
                    .then(user => {
                        if (user) {
                            stateProps.updateUserState(user)
                        }
                        else {

                            info.user.avatar = info.user.picture.data.url
                            delete info.user.picture
                            delete info.user.id
                            info.user.password = ''
                            stateProps.insertUser(info.user)
                        }
                    })
        })
        .catch(err => {
            console.log(err)
            cb({status: 'failed'})
        })
    }
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Login)