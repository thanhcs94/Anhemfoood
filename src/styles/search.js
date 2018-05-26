
import colors from './colors'
export default searchStyle = {

    container: {
        flex: 1,
        backgroundColor:'#ffffff',
    },
    listView:{
        paddingTop:4,
        backgroundColor:'#ffffff',
    },
    actionBar: {
        backgroundColor: colors.accent_color,
        height: 64,
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
        alignItems:'center',
        justifyContent:'center',
        marginTop:4
    },
    boderView:{
        flex:1,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 11,
        height:30,
        borderColor:'#E4E4E4',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft:4,
        marginRight:4,
        marginBottom:4
    },
    searchView:{
        flex:1,
        paddingLeft: 16,
        fontSize: 18,
        height:20,
        borderRadius: 10,
        backgroundColor:'#ffffff',
    },

    containerItem:{
        flex: 1,
        flexDirection: 'row',
        marginTop:8,
        marginBottom:8,
        marginBottom: 1,
        paddingBottom:8,
        borderBottomWidth: 0.9,
        borderBottomColor: colors.divider_color

    },

    viewBanner:{

    },
    viewInfor:{
        flexDirection:'column',
        marginLeft:10,
        marginRight:16,
    },
    photoBanner:{
        width:100,
        height:150
    },
    title:{
        fontFamily: 'Cochin',
        fontSize: 20,
        fontWeight: 'bold',
        color : colors.title_text_color,
    },
    description:{
        marginTop:8,
        color : colors.description_text_color,
    }
}