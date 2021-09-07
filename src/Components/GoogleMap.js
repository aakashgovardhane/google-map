import React from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';



class GoogleMaps extends React.Component {
    constructor() {
        super();
        this.state = {
            center: { lat: 19.993982, lng: 73.790416 },
            poly: [],
        }
    }

    initMap = async (mapProps, map) => {
        let poly = [];
        const { google } = mapProps;


        // const marker = new google.maps.Marker({
        //     position: { lat: 19.997454, lng: 73.789803 },
        //     map: map
        // })

        // const infoWindow = new google.maps.InfoWindow({
        //     content: "<h1>Aakash</h1>"
        // })
        // marker.addListener("click", () => {
        //     infoWindow.open(map, marker);
        // })

        const addMarker = (markerData) => {
            const marker = new google.maps.Marker({
                position: markerData.coords,
                map: map
            })
            poly.push({ lat:markerData.coords.lat,lng:markerData.coords.lng});

            console.log(poly);
            const drawPoly = new google.maps.Polygon({
                paths:poly,
                strokeColor: "#FF0000",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#FF0000",
                fillOpacity: 0.35,
            });
            drawPoly.setMap(map);

        }
        google.maps.event.addListener(map, "click", (event) => {
            addMarker({ coords: {lat:event.latLng.lat(),lng:event.latLng.lng()}})
        })
    }
    componentDidMount() {

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