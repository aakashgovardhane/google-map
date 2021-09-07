import React from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';



class GoogleMaps extends React.Component {
    constructor() {
        super();
        this.state = {
            center: { lat: 19.993982, lng: 73.790416 },
            poly:[],
        }
    }

    initMap = (mapProps, map) => {
        let poly = this.state;
        let poly1 = [];
        const { google } = mapProps;
        this.initializePoly = (poly) => {
            poly = new google.maps.Polyline({
                strokeColor: "#FF0000",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#FF0000",
                fillOpacity: 0.35,
            });
            poly.setMap(map);
        };
        this.addCircle = async (location) => {
            this.setState({poly:location});
        }
        google.maps.event.addListener(map, "click", (event) => {
            let lastWayPoint = event.latLng;
            this.setState((state) => ({
                ...state,
                lastWaypointLocation: lastWayPoint,
            }));
            console.log("addcircle called by map click event",event.latLng);

            this.addCircle(event.latLng);
        });
    }
    render() {
        return (
            <Map google={this.props.google}
                zoom={14}
                style={{ height: "89vh" }}
                onReady={this.initMap}
                onClick={this.onMapClicked}
                initialCenter={this.state.center}
                // initialCenter={{ lat: 19.993982, lng: 73.790416 }}
                center={this.state.center}
                mapType={"satellite"}
                disableDefaultUI={true}
                yesIWantToUseGoogleMapApiInternals>
            </Map>
        );
    }
}


export default GoogleApiWrapper({
    apiKey: "AIzaSyBuxfUtRZSEUT2QrbZA8zUsG58lZUYYmwI"
})(GoogleMaps);