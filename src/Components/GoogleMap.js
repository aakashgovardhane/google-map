import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';


let polygonsArray = [{
    drawPoly: "",
    markers: [],
    polygonPoints: [],
    labelIndex: 0
}];

let polygonColors = [
    {
        strokeColor: "#FF0000",
        fillColor: "#FF0000",
    },
    {
        strokeColor: "#2AFF00",
        fillColor: "#2AFF00",
    },
    {
        strokeColor: "#00FFF0",
        fillColor: "#00FFF0",
    },
    {
        strokeColor: "#003AFF",
        fillColor: "#003AFF",
    },
    {
        strokeColor: "#F300FF",
        fillColor: "#F300FF",
    }
]

class GoogleMaps extends React.Component {
    constructor() {
        super();
        this.state = {
            center: { lat: 19.993982, lng: 73.790416 },
            google: null,
            map: null,
            activePolygon: 0,
            activeColor: 0
        }
    }

    addNewPolygon = () => {
        polygonsArray.push({
            drawPoly: "",
            markers: [],
            polygonPoints: [],
            labelIndex: 0
        })
        this.setState((state) => ({
            ...state,
            activePolygon: ++state.activePolygon,
            activeColor: ++state.activeColor
        }));
        window.alert("you can draw new polygon now")
    }

    hideMarkers = () => {
        const { activePolygon } = this.state
        for (let i = 0; i < polygonsArray[activePolygon].markers.length; i++) {
            polygonsArray[activePolygon].markers[i].setMap(null);
        }
    }

    showMarkers = () => {
        let { map, activePolygon } = this.state;
        for (let i = 0; i < polygonsArray[activePolygon].markers.length; i++) {
            polygonsArray[activePolygon].markers[i].setMap(map);
        }
    }

    addMarker = (markerData) => {
        let { google, map, activePolygon } = this.state;
        const marker = new google.maps.Marker({
            position: markerData.coords,
            label: (++polygonsArray[activePolygon].labelIndex).toString(),
            map: map
        })
        polygonsArray[activePolygon].markers.push(marker);
        let lat = markerData.coords.lat();
        let lng = markerData.coords.lng();
        polygonsArray[activePolygon].polygonPoints.push({ lat, lng });
        this.hidePolygon().then((result) => {
            this.drawPolygon()
        })
    }
    drawPolygon = () => {
        let { google, map, activePolygon, activeColor } = this.state;
        polygonsArray[activePolygon].drawPoly = new google.maps.Polygon({
            paths: polygonsArray[activePolygon].polygonPoints,
            strokeColor: polygonColors[activeColor].strokeColor,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: polygonColors[activeColor].fillColor,
            fillOpacity: 0.35,
        });
        polygonsArray[activePolygon].drawPoly.setMap(map);
    }

    showPolygon = () => {
        let { map, activePolygon } = this.state;
        if (polygonsArray[activePolygon].polygonPoints.length > 0) {
            polygonsArray[activePolygon].drawPoly.setMap(map);
        }
    }

    removeEverything = () => {
        let { activePolygon } = this.state;
        if (polygonsArray[activePolygon].polygonPoints.length > 0) {
            this.hidePolygon()
            this.hideMarkers();
            polygonsArray[activePolygon].polygonPoints = [];
            polygonsArray[activePolygon].markers = [];
            polygonsArray[activePolygon].labelIndex = 0;
        }
    }

    hidePolygon = () => {
        let { activePolygon } = this.state;
        return new Promise((resolve, reject) => {
            if (polygonsArray[activePolygon].polygonPoints.length > 1) {
                polygonsArray[activePolygon].drawPoly.setMap(null);
            }
            resolve({ result: "done" })
        })
    }
    initMap = async (mapProps, map) => {
        const { google } = mapProps;
        this.setState({ google: mapProps.google, map: map })

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
                    <button className="btn btn-primary" onClick={this.addNewPolygon} style={{ position: "absolute", bottom: 100, right: 15 }}>Create New Polygon</button>
                </Map>
            </>
        );
    }
}


export default GoogleApiWrapper({
    apiKey: "AIzaSyBuxfUtRZSEUT2QrbZA8zUsG58lZUYYmwI"
})(GoogleMaps);