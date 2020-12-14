import React, {useEffect, useRef, useState} from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'mapbox/dist/mapbox-sdk'
import wIcon from '../assets/icons/wIcon.svg'
import wIconWarn from '../assets/icons/wIconWarn.svg'
import uIcon from '../assets/icons/uIcon.svg'
import uIconWarn from '../assets/icons/uIconWarn.svg'
import infoIcon from '../assets/icons/info.svg'
import blocIcon from '../assets/icons/blockIcon.svg'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/leaflet.markercluster'
import mainTheme from "../themes/main";
import styles from "../themes/styles";
import SideBar from "../components/SideBar";


const mt = mainTheme;
const mapboxDarkUrl = 'https://api.mapbox.com/styles/v1/kalin8900/cki7kii5f117d19o8wwvay8ma/tiles/256/{z}/{x}/{y}@2x?access_token='
const mapboxNormalUrl = 'https://api.mapbox.com/styles/v1/kalin8900/cki7hwpxz00f219qtfwvhzeir/tiles/256/{z}/{x}/{y}@2x?access_token='
const token = process.env["REACT_APP_API_KEY"];

function isObject(val) {
    if(val === null) {
        return false;
    }
    return ((typeof val === 'function') || (typeof val === 'object'));
}

const generateLayer = (icon, type, data, roadClosed = undefined) => {

    const marker = L.icon({
        iconUrl: icon,
        iconSize: [38, 38],
        iconAnchor: null,
        popupAnchor: [-3, -17]
    });


    return L.geoJSON(data, {
        filter: feature => {
            return (type.includes(feature.properties.type)) && (feature.properties.roadClosed === roadClosed);
        },
        pointToLayer: (feature, latlng) => {
            return L.marker(latlng, {
                icon: marker
            }).on('mouseover', function() {
                this.bindPopup(() => {
                    let ret = "<span style=\"display: flex; justify-content: center; align-items: center; flex-flow: column\">";
                    if(feature.properties.roadClosed)
                        ret += "<span style=\"color: red\"><b>" + "DROGA ZAMKNIĘTA" + "</b></span>"

                    ret += "<span style=\"text-align: center\">" + feature.properties.name + "</span>"

                    ret += "<span style=\"text-align: center;\">" + "Data zakończenia " + feature.properties.end.split(
                        'T')[1] + ' ' + feature.properties.end.split('T')[0] + "</span>"

                    ret += "</span>"

                    return ret;
                }).openPopup().on('click', () => {
                    myMap.flyTo(latlng, 15);
                    setTimeout(() => {
                        this.bindPopup(() => {
                            let ret = "<span style=\"display: flex; justify-content: center; align-items: center; flex-flow: column\">";
                            if(feature.properties.roadClosed)
                                ret += "<span style=\"color: red\"><b>" + "DROGA ZAMKNIĘTA" + "</b></span>"

                            ret += "<span style=\"text-align: center\">" + feature.properties.name + "</span>"

                            ret += "<span style=\"text-align: center;\">" + "Data zakończenia " + feature.properties.end.split(
                                'T')[1] + ' ' + feature.properties.end.split('T')[0] + "</span>"

                            if(!isObject(feature.properties.info))
                                ret += "<span style=\"text-align: center;\">" + feature.properties.info + "</span>"
                            else
                                ret += "<span style=\"text-align: center;\"><b>" + "Brak informacji" + "</b></span>"

                            ret += "</span>"

                            return ret;
                        }, {closeButton: true}).openPopup();
                    }, 2500)
                });
            });
        }
    });
}

let myMap;

const generateCluster = (className) => {
    return L.markerClusterGroup({
        showCoverageOnHover: true,
        iconCreateFunction: (cluster) => {
            return L.divIcon({
                html: "<div style=\"height: 40px; width: 40px; display: flex !important; justify-content: center; align-items: center; color: #212121; text-align: center\">" + cluster.getChildCount() + "</div>",
                className: className,
                iconSize: L.point(40, 40)
            })
        }
    });
}

const uMarkers = generateCluster('cluster yellow')
const iMarkers = generateCluster('cluster blue')

const MapScreen = props => {

    //hardcoded
    const [uTypes, setUTypes] = useState(generateLayer(uIcon, ['U'], props.data, false));
    const [uTypesWarn, setUWarnTypes] = useState(generateLayer(uIconWarn, ['U'], props.data, true));
    const [infoTypes, setInfoTypes] = useState(generateLayer(infoIcon, ['I'], props.data, false));
    const [wTypes, setWTypes] = useState(generateLayer(wIcon, ['W'], props.data, false));
    const [wTypesWarn, setWWarnTypes] = useState(generateLayer(wIconWarn, ['W'], props.data, true));
    const [closedRoads, setClosedRoads] = useState(generateLayer(blocIcon, ['I', 'U', 'W'], props.data, true))

    const [activeLayers, setActiveLayers] = useState(['U', 'I', "W", 'C']);

    useEffect(() => {
        myMap = L.map('map', {minZoom: 6}).setView([52.5, 19], 6);
    }, [])

    useEffect(() => {
        if(props.mode)
            L.tileLayer(
                mapboxDarkUrl + token,
                {
                    attribution: '<a href="https://kalin8900.github.io/app"> Michał Kalinowski</a> | © <a href="https://apps.mapbox.com/feedback/">Mapbox</a> | © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                }).addTo(myMap);
        else
            L.tileLayer(
                mapboxNormalUrl + token,
                {
                    attribution: '<a href="https://kalin8900.github.io/app"> Michał Kalinowski</a> | © <a href="https://apps.mapbox.com/feedback/">Mapbox</a> | © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                }).addTo(myMap);

        if(!props.mapLoaded)
        {
            uMarkers.addLayer(uTypes).addLayer(uTypesWarn);
            iMarkers.addLayer(infoTypes);
            props.setMapLoaded(true)
        }

    }, [props.mode])

    //hardCoded
    useEffect(() => {
        if(myMap) {
            if(activeLayers.includes('C'))
                myMap.addLayer(closedRoads)
            else
                myMap.removeLayer(closedRoads)
            if(activeLayers.includes('U'))
                myMap.addLayer(uMarkers);
            else
                myMap.removeLayer(uMarkers);
            if(activeLayers.includes('W'))
                myMap.addLayer(wTypes).addLayer(wTypesWarn)
            else
                myMap.removeLayer(wTypes).removeLayer(wTypesWarn)
            if(activeLayers.includes('I'))
                myMap.addLayer(iMarkers)
            else
                myMap.removeLayer(iMarkers);
        }

    }, [activeLayers, props.mode])


    return (
        <main style={styles.page}>
            <SideBar activeLayers={activeLayers} style={sidebar} setActiveLayers={setActiveLayers}/>
            <aside style={time}>
                <span>Dane zebrane o godzinie: </span><span style={{marginLeft: '0.5vw'}}> {props.time}</span>
            </aside>
            <div id='map' style={map}>
            </div>
        </main>
    )
}

const time = {
    position: 'absolute',
    width: '35%',
    height: '5vh',
    background: mt.colorsDark.mainBack,
    top: '5%',
    left: '32.5%',
    zIndex: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: mt.colorsDark.lightYellow,
    fontSize: mt.fonts.size.s,
    border: '2px solid ' + mt.colorsDark.strongYellow
}


const map = {
    width: '100%',
    height: '100%',
    zIndex: 4,
}

const sidebar = {
    width: '12vw',
    height: '60%',
    position: 'absolute',
    top: '25%',
    left: '2%',
    zIndex: 5,
    margin: 0,
    padding: 0,
    background: mt.colorsDark.mainBack,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
}


export default MapScreen;