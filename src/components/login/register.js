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
    ActivityIndicator,
    StatusBar,
    Keyboard,
    Animated,
    Image,
} from 'react-native'
import md5 from 'crypto-js/md5'
import { connect } from 'react-redux'

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
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
    gotoRegister = () => {
        this.props.switchScreen('login')
    }
    handleResult = ({status}) => {
        this.setState({isLoading: false})
        if (status === 'failed')
            alert('Registration failed!')
        else if (status === 'exists')
            alert('Email has taken!')
        else if (status === 'input_email') {
            alert('Please input email')
        } else if (status === 'input_password')
            alert('Please input password')
    }
    validEmail (email) {
        const pattern = /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/
        return pattern.test(email)
    }
    createUser = () => {
        this.setState({isLoading: true})
        if (!this.state.email)
            return this.handleResult({status: 'input_email'})
        
        if (!this.state.password)
            return this.handleResult({status: 'input_password'})

        if (!this.validEmail(this.state.email)) {
            alert('Invalid email address!')
            return
        }

        this.props.createUser({
            email: this.state.email,
            password: md5(this.state.password).toString()
        }, this.handleResult)
    }
    updatePassword = (value) => {
        console.log(value)
        this.setState({password: value})
    }
    updateEmail = (value) => {
        this.setState({email: value})
    }
    render () {
        return (
            <View>
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
                        <Text style = {loginStyle.titleApp}>Cùng bé yêu tận hưởng tuổi thơ</Text>
                    </Animated.View>

                        <TextInput
                            placeholder = "Địa chỉ email"
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


                        <TouchableOpacity onPress={this.createUser} style = {loginStyle.buttonLoginContainer}>
                            <Text style ={loginStyle.buttonLoginText}>Đăng kí</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.gotoRegister}>
                            <Text style={loginStyle.instructionsText}>Đăng nhập</Text>
                        </TouchableOpacity>


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
            </View>
        )
    }
}

const mapStateToProps = (state, ownState) => ({...state, ...ownState})
const mapDispatchToProps = dispatch => ({dispatch})

const mergeProps = (stateProps, dispatchProps) => ({
    ...stateProps,
    createUser (info, cb) {
        stateProps.checkExistEmail(info.email)
                .then(user => {
                    if (user) {
                        cb({status: 'exists'})
                    } else {
                        Object.assign(info, {
                            name: '',
                            city: '',
                        })
                        stateProps.insertUser(info)
                                .then(result => {
                                    if (!result)
                                        cb({status: 'failed'})
                                })
                    }
                })
    }
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Register)