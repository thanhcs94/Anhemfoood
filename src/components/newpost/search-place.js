import React, { Component }  from 'react'
import {
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    FlatList,
    TextInput
} from 'react-native'
import searchStyle from '../../styles/search'
import SearchItem from './search-item'
import colors from '../../styles/colors'
var url = 'https://api.foursquare.com/v2/venues/search?client_id=GSNNXCAHZEGS2V30HJJ3BVBRDUIWAX0DM3TOTVUPGI5HB211&client_secret=UALKGANLRI0AZ5QPINCRJSPHTR4PU4ZVSNL2WPO25M1CYNNL%20&v=20130815%20&ll=10.778187,106.701181&query=';
class SearchPlace extends Component {

    constructor(props){
        super(props);
        this.state={
            text:'',
            data :[]
        }
    }

    componentDidMount(){
        this.getDataFromAPI();
    }

    //https://api.themoviedb.org/3/movie/now_playing?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed
    getDataFromAPI  = () =>{
        console.log("dataaaaa = > "+ url+ this.state.text);
        return fetch(url+ this.state.text)
            .then((response) => response.json())
            .then((responseJson) => {
                var data2= responseJson.response.venues;
                this.setState({
                    data:data2
                })
                console.log(responseJson);
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    renderSearchItem = (post) => {
        return <SearchItem post={post} navigation = {this.props.navigation}/>
    }
    goback = () => {
        this.props.navigation.goBack()
    }

    render () {
        return (
            <View style={searchStyle.container}>
                <StatusBar
                    barStyle="light-content"/>
                <View style={searchStyle.actionBar}>

                    <TouchableOpacity onPress={this.goback}>
                        <Text style={[searchStyle.textActionBar, {textAlign:'left'}]}>Back</Text>
                    </TouchableOpacity>

                    <View style={searchStyle.boderView}>
                        <TextInput
                            style={{
                                flex:1,
                                paddingLeft: 16,
                                fontSize: 15,
                                height:20,
                                borderRadius: 10,
                                backgroundColor:'#ffffff'
                            }}
                            onChangeText={(text) => this.setState({text})}
                            value={this.state.text}
                        />
                    </View>

                    <TouchableOpacity onPress={this.getDataFromAPI}>
                        <Text style={[searchStyle.textActionBar, {textAlign:'right'}]}>Search</Text>
                    </TouchableOpacity>

                </View>
                    <FlatList
                        data= {this.state.data}
                        renderItem={this.renderSearchItem}/>
            </View>
        )
    }
}

export default SearchPlace