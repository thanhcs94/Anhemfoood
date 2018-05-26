import React, { Component }  from 'react'
import {
    View,
    Text,
    FlatList,
    Image,
    StatusBar,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import colors  from '../../styles/colors'
import homeStyle from '../../styles/home'
import icons from '../../styles/icons'
import MapView from 'react-native-maps';
var Lightbox = require('react-native-lightbox');
const region = {
    latitude: 10.778218,
    longitude: 106.701148,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
}
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
var SearchBar = require('react-native-search-bar');
var mapMarker =[];
var img_marker = icons.ic_hearted;
const urlFourSquare = 'https://api.foursquare.com/v2/venues/search?client_id=GSNNXCAHZEGS2V30HJJ3BVBRDUIWAX0DM3TOTVUPGI5HB211&client_secret=UALKGANLRI0AZ5QPINCRJSPHTR4PU4ZVSNL2WPO25M1CYNNL&v=20130815&ll=';
class Map extends Component {

    state = {
        initialPosition: 'unknown',
        lastPosition: 'unknown',
        current_position : '',
        markers :[]
    };
    onRegionChange(region) {
        this.setState({ region });
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                var initialPosition = position;
                this.setState({initialPosition});
                console.log("LOCATION " + JSON.stringify(initialPosition));
            },
            (error) => alert(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
        this.watchID = navigator.geolocation.watchPosition((position) => {
            var lastPosition = position;
            this.setState({lastPosition});
            console.log("Location : " + JSON.stringify(lastPosition))
            this.getMoviesFromApi(lastPosition.coords.latitude, lastPosition.coords.longitude);
        });
    }

    async getMoviesFromApi(lat,lng) {
    try {
            let response = await fetch(urlFourSquare+lat+','+lng);
            let responseJson = await response.json();
            for(var i =0 ; i< responseJson.response.venues.length ;i++){
                var data = responseJson.response.venues[i];
                var markers = {latlng:{
                        latitude:data.location.lat,
                        longitude:data.location.lng},
                        imagePath :'https://facebook.github.io/react/img/logo_og.png',
                        title: data.name};
                mapMarker[i] = markers;
            }
            this.setState({
                markers:mapMarker
            });
        } catch(error) {
            console.error(error);
        }
    }

renderMarkers() {
        let markers = this.state.markers
        let markerArrays = [];
        for(let i = 0; i< markers.length ; i++){
            let item = markers[i];
            markerArrays.push(
                <MapView.Marker  key={i}  coordinate={item.latlng}  title={'F** mapview'} >
                    <Image
                        style={{width:30, height:30}}
                        source={img_marker}
                        onLoad={() => this.forceUpdate()}>
                        <Text style={{width:0, height:0}}>{Math.random()}</Text>
                    </Image>

                    <MapView.Callout  style={{ alignItems: 'center', justifyContent: 'center', width:170}}>
                        {/*<Lightbox*/}
                            {/*renderContent={() => {*/}
                        {/*return (<Image*/}
                              {/*source={{uri: item.imagePath}}*/}
                              {/*style={{flex: 1}}/>);}}>*/}

                            {/*<Image source={{uri: item.imagePath}}*/}
                                   {/*style={{width:150, height: 150,borderRadius:10}}/>*/}

                        {/*</Lightbox>*/}
                        <Text style={{fontSize: 12, fontWeight:'500', marginTop:10}}>{item.title}</Text>
                    </MapView.Callout>
                </MapView.Marker>
            )
        }
        return markerArrays;
    }
    renderFilterButton () {
        return (
             <View style={{marginTop: 400, backgroundColor: '#f3f3f3'}}>
                {/* Rest of the app comes ABOVE the action button component !*/}
                <ActionButton buttonColor="rgba(231,76,60,1)">
                <ActionButton.Item buttonColor='#9b59b6' title="Restaurants" onPress={() => console.log("notes tapped!")}>
                    <Icon name="md-create" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#3498db' title="Parks and Playgrounds" onPress={() => {}}>
                    <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#1abc9c' title="Activities for kid" onPress={() => {}}>
                    <Icon name="md-done-all" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                </ActionButton>
            </View>
        )
    }
    render () {
        return (
                <MapView
                    ref='map'
                    initialRegion={region}
                    style={{flex:1}}
                    onRegionChange={this.onRegionChange.bind(this)}>
                    <View style={{height: 40, marginTop: 30, width: 350, alignSelf: 'center'}}>
                    <SearchBar
                        opacity={0.8}
                        ref='searchBar'
                        searchBarStyle='minimal'
                        textFieldBackgroundColor='white'
                        placeholder='Search'/>
                    {this.renderFilterButton()}
                    </View>
                    {this.renderMarkers()}
                </MapView>
        )
    }
}
const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
export default Map