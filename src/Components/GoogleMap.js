import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

let drawPoly = "";
let markers = [];
let polygonPoints = [];
let labelIndex = 0

class GoogleMaps extends React.Component {
    constructor() {
        super();
        this.state = {
            center: { lat: 19.993982, lng: 73.790416 },
            google: null,
            map: null,
        }
    }

    hideMarkers = () => {
        for (let i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
    }

    showMarkers = () => {
        let { map } = this.state;
        for (let i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }

    addMarker = (markerData) => {
        let { google, map } = this.state;
        const marker = new google.maps.Marker({
            position: markerData.coords,
            label: (++labelIndex).toString(),
            map: map
        })
        markers.push(marker);
        let lat = markerData.coords.lat();
        let lng = markerData.coords.lng();
        polygonPoints.push({ lat, lng });
        console.log("polyponis", polygonPoints);
        this.hidePolygon().then((result) => {
            this.drawPolygon()
        })
    }
    drawPolygon = () => {
        let { google, map } = this.state;
        drawPoly = new google.maps.Polygon({
            paths: polygonPoints,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
        });
        drawPoly.setMap(map);
    }

    showPolygon = () => {
        let { map } = this.state;
        if (polygonPoints.length > 0) {
            drawPoly.setMap(map);
        }
    }

    removeEverything = () => {
        if (polygonPoints.length > 0) {
            this.hidePolygon()
            this.hideMarkers();
            polygonPoints = [];
            markers = [];
            labelIndex = 0;
        }
    }

    hidePolygon = () => {
        return new Promise((resolve, reject) => {
            if (polygonPoints.length > 1) {
                drawPoly.setMap(null);
            }
            resolve({ result: "done" })
        })
    }
    initMap = async (mapProps, map) => {
        const { google } = mapProps;
        this.setState({ google: mapProps.google, map: map })

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
            this.addMarker({ coords: event.latLng })
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
                    <button className="btn btn-primary" onClick={this.removeEverything} style={{ position: "absolute", top: 180, right: 15 }}>Clear Everything</button>
                    <button className="btn btn-primary" onClick={this.showPolygon} style={{ position: "absolute", top: 140, right: 15 }}>Show Polygon</button>
                    <button className="btn btn-primary" onClick={this.hidePolygon} style={{ position: "absolute", top: 100, right: 15 }}>Hide Polygon</button>
                    <button className="btn btn-primary" onClick={this.hideMarkers} style={{ position: "absolute", top: 60, right: 15 }}>Hide Markers</button>
                    <button className="btn btn-primary" onClick={this.showMarkers} style={{ position: "absolute", top: 20, right: 15 }}>Show Markers</button>
                </Map>
            </>
        );
    }
}


export default GoogleApiWrapper({
    apiKey: "AIzaSyBuxfUtRZSEUT2QrbZA8zUsG58lZUYYmwI"
})(GoogleMaps);