import colors from './colors'
export default homeStyle = {

    container: {
        flex: 1,
        backgroundColor:'#fafafa',
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
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        padding:4,
        backgroundColor:'#fafafa',
        borderRadius:4,
        margin:8
    },
    imageButtonTop:{
        height:20,
        width:20,
        marginLeft:4
    },
    textButtonTop:{
        fontSize:12,
        marginLeft:4
    },
    viewContentFilterContainer:{
        flexDirection:'column',
        alignItems:'center',
    },
    textFilter:{
        color: '#0b0e08',
        fontWeight:'600',
        flex:7,
        fontSize:16,
        textAlign:'left',
    },
    textFilterTitle:{
        color: '#0b0e08',
        fontWeight:'500',
        fontSize:16,
        textAlign:'left',
        margin:8,
    },
    controlFilter:{
        flex:0,
    },
    controlFilterImage:{
        flex:0,
        marginRight:8,
        width:30,
        height:30
    },
    controlFilterDown:{
        flex:0,
        marginRight: 10
    },
    input:{
        minWidth:300,
        flexWrap:'wrap',
        height : 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal : 10,
        color:'#fff',
        marginBottom : 10,
    },
    buttonContainer:{
        backgroundColor: "#1980b9",
        paddingVertical:10,
        marginTop:15,
        marginBottom:20
    },
    loginButton:{
        color: '#ffffff',
        textAlign:'center',
        fontWeight:'700'
    }
}