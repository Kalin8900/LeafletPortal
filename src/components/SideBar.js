import React from 'react'
import mainTheme from "../themes/main";
import {ReactComponent as RoadWork} from '../assets/icons/shovel.svg'
import {ReactComponent as Crash} from '../assets/icons/car-crash.svg'
import {ReactComponent as Info} from '../assets/icons/information.svg'
import {ReactComponent as Refresh} from '../assets/icons/refresh.svg'
import {ReactComponent as Block} from '../assets/icons/road-block.svg'
import {obstructionType} from "../enums/enums";
import {win} from "leaflet/src/core/Browser";

const mt = mainTheme;

const ListItem = (props) => {

    const removeElement = () => {
        const copy = props.activeLayers;

        const idx = copy.indexOf(props.name);
        if(idx > -1)
            copy.splice(copy.indexOf(props.name), 1);

        props.setActiveLayers([...copy]);
    }

    if(props.activeLayers.includes(props.name))
    {
        return(
            <li style={props.activeStyle} onClick={removeElement} className='item' >
                {props.children}
            </li>
        )
    }

    return (
        <li style={props.style} onClick={() => props.setActiveLayers([...props.activeLayers, props.name])} className='item'>
            {props.children}
        </li>
    )
}

const SideBar = props => {

    return (
        <aside style={props.style}>
            <ul style={ulStyle}>
                <li style={{...liStyle, background: mt.colorsDark.strongYellow, height: '20%',fontSize: mt.fonts.size.s, fontWeight: 700, color: mt.colorsDark.mainBack}}>
                    Utrudnienia
                </li>
                <ListItem name={'U'} activeLayers={props.activeLayers} setActiveLayers={props.setActiveLayers}  style={liStyle} activeStyle={activeLi}>
                    {(props.activeLayers.includes('U')) ? <RoadWork style={{...imgStyle, fill: mt.colorsDark.mainBack}}/> : <RoadWork style={imgStyle}/>}
                    {obstructionType['U']}
                </ListItem>
                <ListItem name={'I'} activeLayers={props.activeLayers} setActiveLayers={props.setActiveLayers}  style={liStyle} activeStyle={activeLi}>
                    {(props.activeLayers.includes('I')) ? <Info style={{...imgStyle, fill: mt.colorsDark.mainBack}}/> : <Info style={imgStyle}/>}
                    {obstructionType['I']}
                </ListItem>
                <ListItem name={'W'} activeLayers={props.activeLayers} setActiveLayers={props.setActiveLayers}  style={liStyle} activeStyle={activeLi}>
                    {(props.activeLayers.includes('W')) ? <Crash style={{...imgStyle, height: '4.5vh', fill: mt.colorsDark.mainBack}}/> : <Crash style={{...imgStyle, height: '4.5vh'}}/>}
                    {obstructionType['W']}
                </ListItem>
                <ListItem name={'C'} activeLayers={props.activeLayers} setActiveLayers={props.setActiveLayers}  style={liStyle} activeStyle={activeLi}>
                    {(props.activeLayers.includes('C')) ? <Block style={{...imgStyle, height: '3.5vh', fill: mt.colorsDark.mainBack}}/> : <Block style={{...imgStyle, height: '3.5vh'}}/>}
                    {obstructionType['C']}
                </ListItem>
                <div style={{flexGrow: 1}}></div>
                <li onClick={() => window.location.reload()} style={refresh} className='item'>
                    <Refresh style={{...imgStyle}} />
                    Odśwież
                </li>
            </ul>
        </aside>
    )
}

const imgStyle = {
    height: '3vh',
    width: 'auto',
    marginRight: '1vw',
    fill: mt.colorsDark.lightYellow
}

const ulStyle = {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: '0.25vh',
    position: 'relative'
}

const liStyle = {
    width: '100%',
    height: '15%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: mt.fonts.size.xs,
    color: mt.colorsDark.lightYellow,
    background: mt.colorsDark.lightBack
}

const activeLi = {
    ...liStyle,
    color: mt.colorsDark.mainBack,
    background: mt.colorsDark.lightYellow
}

const refresh = {
    ...liStyle,
    background: mt.colorsDark.blue,
    height: '20%',
    color: mt.colorsDark.lightYellow
}





export default SideBar;