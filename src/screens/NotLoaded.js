import React from 'react'
import mainTheme from "../themes/main";
import {ReactComponent as ServerError} from '../assets/icons/servers.svg'
import ErrorPage from "./ErrorPage";

const mt = mainTheme;

const NotLoaded = props => {

    const img = {
        height: '30vh',
        width: 'auto',
        fill: '#FA180A'
    }

    return(
        <ErrorPage primary={false} mode={props.mode} button={'Spróbuj ponownie'} fill={"#0AA4FA"} navigate={() => window.location.reload()}>
            <ServerError style={img} />
            <span style={{fontSize: mt.fonts.size.xl}}>Nie udało się pobrać danych z GDDiK</span>
            <span style={{fontSize: mt.fonts.size.l}}>Spróbuj ponownie później</span>
        </ErrorPage>
    )
}

export default NotLoaded;
