import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import { RestrictedZonesData } from '../Data/RestrictedZonesData'

let polygonsArray = [];

let circlesArray = [];

let polygonColors = {
    restrictedZone: {
        strokeColor: "#FF0000",
        fillColor: "#FF0000",
    },
    permissionNeededZone: {
        strokeColor: " #FFFF00",
        fillColor: " #FFFF00",
    }
}

class RestrictedZones extends React.Component {
    constructor() {
        super();
        this.state = {
            center: { lat: 19.993982, lng: 73.790416 },
            google: null,
            map: null,
        }
    }

    initMap = async (mapProps, map) => {
        const { google } = mapProps;
        this.setState({ google: mapProps.google, map: map })

        google.maps.event.addListener(map, "click", (event) => {
            this.addMarker({ coords: event.latLng })
        })
    }

    drawPolygon = () => {
        let { google, map } = this.state;
        for (let i = 0; i < polygonsArray.length; i++) {
            polygonsArray[i].drawPoly = new google.maps.Polygon({
                paths: polygonsArray[i].polygonPoints,
                strokeColor: polygonsArray[i].colors.strokeColor,
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: polygonsArray[i].colors.fillColor,
                fillOpacity: 0.35,
            });
            polygonsArray[i].drawPoly.setMap(map);
        }
    }
    drawCircle = () => {
        let { google, map } = this.state;

        for (let i = 0; i < circlesArray.length; i++) {
            circlesArray[i].drawCircle = new google.maps.Circle({
                strokeColor: circlesArray[i].colors.strokeColor,
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: circlesArray[i].colors.fillColor,
                fillOpacity: 0.35,
                map,
                center: circlesArray[i].center,
                radius: Math.sqrt(circlesArray[i].population) * 100,
            });
            console.log(circlesArray.drawCircle)
        }
    }
    componentWillMount() {
        RestrictedZonesData.map((zone) => {
            if (zone.shapeType === "polygon") {
                polygonsArray.push({
                    drawPoly: "",
                    polygonPoints: zone.coords,
                    labelIndex: 0,
                    colors: zone.zoneType === "restricted" ? polygonColors.restrictedZone : polygonColors.permissionNeededZone
                })
                console.log("polygon",polygonsArray)
            } else if (zone.shapeType === "circle") {
                circlesArray.push({
                    drawCircle: "",
                    center:zone.center,
                    population:zone.population,
                    colors: zone.zoneType === "restricted" ? polygonColors.restrictedZone : polygonColors.permissionNeededZone
                })
                console.log("circle",circlesArray)
            }
        })
    }
    componentDidMount() {
    }

    render() {
        return (
            <>
                <Map google={this.props.google}
                    zoom={13.5}
                    style={{ height: "100vh" }}
                    onReady={this.initMap}
                    onClick={this.onMapClicked}
                    initialCenter={this.state.center}
                    // initialCenter={{ lat: 19.993982, lng: 73.790416 }}
                    center={this.state.center}
                    disableDefaultUI={true}
                    mapType={"satellite"}
                    yesIWantToUseGoogleMapApiInternals>
                    <button className="btn btn-primary" onClick={()=>{
                        this.drawCircle();
                        this.drawPolygon();
                    }} style={{ position: "absolute", bottom: 20, right: 15 }}>View Restricted Area</button>
                </Map>
            </>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyBuxfUtRZSEUT2QrbZA8zUsG58lZUYYmwI"
})(RestrictedZones);