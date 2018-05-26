import colors from './colors'
const loginStyle = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:  colors.default_primary_color,
        padding :10
    },
    titleApp: {
        width : 200,
        fontSize: 18,
        textAlign: 'center',
        margin: 10,
        color :colors.text_primary_color
    },
    logoContainer:{
        // flexGrow :1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoImage:{
        width:150,
        height:150
    },
    instructionsText: {
        textAlign: 'center',
        color: colors.secondary_text_color,
        fontSize:13,
        marginBottom: 5,
    },
    inputText:{
        minWidth:300,
        flexWrap:'wrap',
        height : 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal : 10,
        color :colors.text_primary_color,
        borderRadius:4,
        marginBottom : 10,
        fontSize:14
    },
    buttonLoginContainer:{
        backgroundColor: colors.accent_color,
        paddingVertical:10,
        marginTop:15,
        marginBottom:20,
        borderRadius:16
    },
    buttonLoginText:{
        color: colors.text_primary_color,
        margin:4,
        textAlign:'center',
        fontWeight:'700'
    }

}

export default loginStyle