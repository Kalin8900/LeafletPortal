import React from 'react'
import styles from "../themes/styles";
import mainTheme from "../themes/main";

const mt = mainTheme;

const LoadingScreen = props => {


    const page = {
        ...styles.page,
        background: (props.mode) ? styles.page.background : mt.colorsNormal.mainBack,
        color: (props.mode) ? mt.colorsDark.lightYellow : mt.colorsDark.mainBack
    }

    return(
        <div style={{...page, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div className="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default LoadingScreen;