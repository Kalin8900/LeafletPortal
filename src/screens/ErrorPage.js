import React, {useEffect} from 'react'
import styles from "../themes/styles";
import mainTheme from "../themes/main";

const mt = mainTheme;

const Button = props => {

    const btn = {
        ...styles.btn,
        height: '10vh',
        width: '60vh',
        background: (props.primary) ?  styles.btn.background : props.fill,
        color: (props.primary) ?  styles.btn.color : mt.colorsDark.lightYellow
    }

    return(
        <div className={'btn'} onClick={props.navigate} style={btn}>
            {props.children}
        </div>
    )
}

const ErrorPage = props => {


    const pageStyle = {
        ...styles.page,
        background: (props.mode) ? styles.page.background : mt.colorsNormal.mainBack,
        color: (props.mode) ? mt.colorsDark.lightYellow : mt.colorsDark.mainBack,
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '3vh'
    }

    return (
        <div style={pageStyle}>
            {props.children}
            <Button navigate={props.navigate} fill={props.fill} primary={props.primary}>
                {props.button}
            </Button>
        </div>
    )
}

export default ErrorPage;