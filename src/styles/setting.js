import colors from './colors'
export default settingStyle = {

    container: {
        flex: 1,
        backgroundColor:'#ffffff',
    },
    actionBar: {
        backgroundColor: colors.accent_color,
        height: 60,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 30,
        flexDirection: 'row',
    },
    textActionBar:{
        color: '#ffffff',
        fontWeight:'400',
        flex:1,
        fontSize:15,
    },
    buttonTop:{
        padding:4,
        borderRadius:4,
    },
    imageButtonTop:{
        height:30,
        width:30,
        marginLeft:4
    },
    textButtonTop:{
        fontSize:14,
    },
    avatar:{
        height:80,
        width:80,
        borderRadius:40,
        margin:10,
        marginTop:8,
        borderColor:colors.accent_color,
        borderWidth:1
    },
    viewHeader:{
        flexDirection:'column',
        alignItems:'center',
        backgroundColor:'#ffffff',
        margin:16
    },
    viewContent:{
        flexDirection:'column',
        backgroundColor:'#ffffff',
        marginLeft:16,
        marginRight:16,
        marginBottom:16
    },
}