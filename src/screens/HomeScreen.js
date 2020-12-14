import React from 'react'
import styles from "../themes/styles";
import mainTheme from "../themes/main";
import {ReactComponent as Map} from "../assets/icons/map.svg";
import {Link} from "react-router-dom";

const mt = mainTheme;

const HomeScreen = props => {

    const page = {
        ...styles.page,
        background: (props.mode) ? styles.page.background : mt.colorsNormal.mainBack,
        color: (props.mode) ? mt.colorsDark.lightYellow : mt.colorsDark.mainBack
    }

    const btn = {
        ...styles.btn,
        height: '60vh',
        width: '60vh',
    }

    return (
        <div style={{...page, display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
            <div style={qa}>
                <div>
                    <div style={{...big, marginTop: '12vh'}}>
                        Czym jest ten portal?
                    </div>
                    <div style={ans}>
                        Aplikacja wysyła zapytanie do GDDKiA, które zwraca dane o aktulnych informacjach o możliwych
                        utrudnieniach na drodze.
                        Utrudnienia te są następnie wizualizowane na interaktywnej mapie wraz z możliwością filtrowania
                        zawartości.
                        Po naciśnięciu na dane utrudnienie pokazywana jest szczegółowa infomracja o zainstałej trudności
                        w ruchu drogowym.
                    </div>
                </div>
                <div>
                    <div style={big}>
                        Użyte technologie
                    </div>
                    <div style={ans}>
                        React, Leaflet, Leaflet cluster, Mapbox, React Router
                    </div>
                </div>
                <div>
                    <div style={big}>
                        O autorze
                    </div>
                    <div style={ans}>
                        Aplikacja stworzona przez <span style={{color: mt.colorsNormal.blue}}> Michała Kalinowskiego </span> w ramach projektu na przedmiot Oprogramowanie GIS na Politechnice Warszawskiej.
                        <br/>
                        <br/>
                        Zapraszam do odwiedzenia mojej strony: <a href={'https://kalin8900.github.io/app'}
                                                                  style={{textDecoration: 'none',
                                                                      color: mt.colorsNormal.blue}}>kalin8900.github.io/app</a>
                    </div>
                </div>
            </div>
            <Link to={'/mapgddik'} style={btn} className='btn'>
                Przejdź do mapy
                <Map style={{height: '35%', width: 'auto'}} className='btn'/>
            </Link>
        </div>
    )
}


const ans = {
    marginTop: '2vh',
    fontSize: mt.fonts.size.xs
}

const qa = {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'flex-start',
    gap: '2vw',
    height: '100%',
    width: '50vw',
}

const big = {
    fontSize: mt.fonts.size.m,
    fontWeight: 600
}

export default HomeScreen