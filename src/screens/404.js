import React from 'react'
import mainTheme from "../themes/main";
import {ReactComponent as Warning} from '../assets/icons/warning.svg'
import ErrorPage from "./ErrorPage";
import {useHistory} from "react-router-dom";

const mt = mainTheme;

const MissingScreen = props => {

    const history = useHistory();

    const img = {
        height: '30vh',
        width: 'auto',
        fill: (props.mode) ? mt.colorsDark.lightYellow : mt.colorsDark.mainBack
    }

    return (
        <ErrorPage primary={true} navigate={() => history.push('/')} mode={props.mode} button={'Wróć na stronę główną'}>
            <Warning style={img}/>
            <span style={{fontSize: mt.fonts.size.xl}}>404</span>
            <span style={{fontSize: mt.fonts.size.l}}>Nie udało się znaleźć tego czego szukałeś :(</span>
        </ErrorPage>
    )
}

export default MissingScreen;
