import X2JS from "x2js";
import RequestService from "./RequestService";

class DataService {
    constructor() {
        this.gddkiaApi = 'https://www.gddkia.gov.pl/dane/zima_html/utrdane.xml';
        this.bingApi = "http://dev.virtualearth.net/REST/v1/Traffic/Incidents/49.18170338770663,11.920166015625002,55.59076338488528,26.081542968750004?key=Aj-gWgzQIU99Cl8WebbpRqBe2lWKxQh3-gLqHEErpbgVRnKrdi4luFXIaqVN8QlX";
        this.proxy = 'https://cors-anywhere.herokuapp.com/';
        this.geoJSON = {
            type: "FeatureCollection",
            name: "obstructions",
            crs: { type: "name", properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" } },
            features: []
        };
        this.parser = new X2JS();
    }

    //TODO: Generate geoJSON, make new map
    async bingData() {
        const response = await RequestService(this.bingApi, 'GET').catch(err => console.log(err))

        if(!response[1])
            return [[], false];

        const json = JSON.parse(response[0]);
        const mainKeys = Object.keys(json);

        const keys = Object.keys(json[mainKeys[3]][0]);
        const obj = json[mainKeys[3]][0]
        const items = obj[keys[1]];

        console.log(items)

        for(let item of items)
        {

        }

        return [[], true];
    }

    async gddikData() {
        const response = await RequestService(this.proxy + this.gddkiaApi, 'GET').catch(err => console.log(err));

        if(!response[1])
            return [[], false];

        const json = this.parser.xml2js(response[0]);
        const mainKey = Object.keys(json);
        const keys = Object.keys(json[mainKey]);


        const obstructions = (json[mainKey])[keys[0]];
        const time = (json[mainKey])[keys[1]];
        const timeWithoutZone = time.split('+')[0];

        for(let obstr of obstructions)
        {
            this.geoJSON.features.push({
                type: 'Feature',
                properties: {
                    type: obstr.typ,
                    start: obstr.data_powstania.split('+')[0],
                    end: obstr.data_likwidacji.split('+')[0],
                    name: obstr.nazwa_odcinka,
                    roadClosed: obstr.droga_zamknieta === 'true',
                    info: obstr.objazd
                },
                geometry: {
                    type: 'Point',
                    coordinates: [obstr.geo_long, obstr.geo_lat]
                }
            })
        }

        return [[timeWithoutZone, this.geoJSON], true];
    }

}

export default DataService;