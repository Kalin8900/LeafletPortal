import React from 'react'
import {NavLink, useHistory} from "react-router-dom";
import mainTheme from "../themes/main";
import ReactSwitch from "react-switch";
import {ReactComponent as Moon} from "../assets/icons/moon.svg";

const mt = mainTheme;

const Header = props => {

    return (
        <nav style={wrapper}>
            <NavLink className='link' exact to='/' style={firstLink} activeStyle={activeLink}>
                Michał Kalinowski - GIS
            </NavLink>
            <NavLink className='link' exact to='/mapgddik' style={link} activeStyle={activeLink}>
                Mapa utrudnień GDDiK
            </NavLink>
            <div className='' style={{...link,  position: 'relative'}} >
                <div style={{position: 'absolute', height: '100%', width: '100%', background: '#373232', opacity: 0.8}} />
                Mapa utrudnień BING
            </div>
            <div style={{flexGrow: 1}}></div>
            <div style={modeStyle}>
                <Moon style={moon}/>
                <span style={{marginRight: '1vw'}} >Tryb ciemny</span>
                <ReactSwitch checked={props.mode} onChange={(checked) => {
                    props.setMode(checked);
                }}/>
            </div>
        </nav>
    )
}

const moon = {
    height: '3vh',
    width: 'auto',
    fill: mt.colorsDark.lightYellow
}

const modeStyle = {
    color: mt.colorsDark.lightYellow,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: mt.fonts.size.s,
    gap: '1vw',
    marginRight: '2vw'
}

const wrapper = {
    height: '8vh',
    width: '100%',
    background: mt.colorsDark.mainBack,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
}

const link = {
    textDecoration: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '8vh',
    padding: '0 2vw',
    color: mt.colorsDark.strongYellow,
    fontSize: mt.fonts.size.s
}

const firstLink = {
    ...link,
    fontSize: mt.fonts.size.l,
    fontWeight: 700
}

const activeLink = {
    background: mt.colorsDark.strongYellow,
    color: mt.colorsDark.mainBack
}

export default Header;