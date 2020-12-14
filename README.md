# Web application presenting current road difficulties.

This application collects data on the current road difficulties in Poland and displays them on an interactive map.


### Data

Traffic data are collected from https://www.gddkia.gov.pl/ in XML format.
Then they are parsed with [X2JS](https://github.com/x2js/x2js) to JSON, which later is the basis for the creation of `geoJSON`.
Each `geoJSON` feature properties consists of:
- type -> accident category,
- start -> start date time,
- end -> estimated end date time,
- name -> name of the road,
- roadClosed -> true when road is closed, false otherwise,
- info -> longer description of the accident

### Visualization

The data is broken down into 4 categories: 
- Road Works, 
- Information, 
- Accidents, 
- Road Closures

Each of them represented by a different marker on the map.

Layer map is delivered by MapBoxAPI.

### Technologies

- React -> main framework
- React Router Dom -> for routing
- Leaflet -> interactive map
- MapBox -> map layers
- Leaflet cluster -> grouping points
- axios -> API calls

#### Credits

Icons made by:

[Freepik](https://www.flaticon.com/authors/freepik)