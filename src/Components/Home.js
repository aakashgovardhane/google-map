import React from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import GoogleMap from './GoogleMap';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            activeMarkers: [],
            selectedPlaces: [],
            activeMarker: {},
            activePlace: {},
            showingInfoWindow: false,
        }
    }

    render() {
        return (
            <div>
                <div style={{ textAlign: 'center' }}><h1>Google map integration</h1></div>
                <GoogleMap />
            </div>
        );
    }
}


export default Home;