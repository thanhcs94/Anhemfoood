import colors from './colors'
export default newPostStyle = {

    container: {
        backgroundColor:'#ffffff',
        flex: 1,
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
    textContainer: {
        backgroundColor:'#ffffff',
        flex:1,
        marginTop:8,
        marginLeft:16,
        marginRight:16,
    },

    bottomContainer: {
        flex:0,
        marginBottom:16,
        marginLeft:16,
        marginRight:16,
    },
    buttonTop:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        padding:4,
        backgroundColor:'#fafafa',
        borderRadius:4,
        margin:8,
        justifyContent:'center',
        borderWidth:1,
        borderColor:colors.accent_color
    },
    imageButtonTop:{
        height:30,
        width:30,
        marginLeft:4
    },
    textButtonTop:{
        fontSize:12,
        marginLeft:4
    },
    avatar:{
        height:40,
        width:40,
        borderRadius:20,
        marginTop:10,
        marginLeft:16,
        marginTop:8,
        borderColor:colors.accent_color,
        borderWidth:1
    },

    photoSelect:{
        height:170,
        borderRadius:20,
        marginTop:8,
    },

    viewHeader:{
        flexDirection:'row',
        backgroundColor:'#ffffff',
        alignItems:'center'
    },
    textNameHeader:{
        fontSize:14,
        fontWeight:'700',
        color: colors.title_text_color,
        alignItems:'center',
        justifyContent:'center',
        marginTop:10,
        marginLeft:4
    }

}