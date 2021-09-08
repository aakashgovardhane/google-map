import React from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

let drawPoly = "";
let markers = [];
let polygonPoints = [];
let labelIndex = 0

class GoogleMaps extends React.Component {
    constructor() {
        super();
        this.state = {
            center: { lat: 19.993982, lng: 73.790416 },
            poly: [],
            google: null,
            map: null,
        }
    }

    drawPolygon = () => {
        let { google, map } = this.state;
        polygonPoints = [...markers]
        drawPoly = new google.maps.Polygon({
            paths: polygonPoints,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
        });
        console.log("polygon", drawPoly);
        console.log("map", map)
        drawPoly.setMap(map);
    }

    removePolygon = () => {
        return new Promise((resolve, reject) => {
            let { google, map } = this.state;
            if(polygonPoints.length>0){
            polygonPoints = [];
            drawPoly.setMap(null);
            }
            resolve({result:"done"})
        })
    }

    addMarker = (markerData) => {
        let { google, map } = this.state;
        const marker = new google.maps.Marker({
            position: markerData.coords,
            label: (++labelIndex).toString(),
            map: map
        })
        markers.push({ lat: markerData.coords.lat, lng: markerData.coords.lng });
        this.removePolygon().then(()=>{
            this.drawPolygon()
        })
    }
    initMap = async (mapProps, map) => {
        const { google } = mapProps;
        this.setState({ google: mapProps.google, map: map })
        let labelIndex = 0;



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

        google.maps.event.addListener(map, "click", (event) => {
            this.addMarker({ coords: { lat: event.latLng.lat(), lng: event.latLng.lng() } })
        })
    }
    componentDidMount() {

    }
    render() {
        return (
            <>
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
                    <button className="btn btn-primary" onClick={this.removePolygon} style={{ position: "absolute", top: 40 }}>clear Polygon</button>
                </Map>
            </>
        );
    }
}


export default GoogleApiWrapper({
    apiKey: "AIzaSyBuxfUtRZSEUT2QrbZA8zUsG58lZUYYmwI"
})(GoogleMaps);