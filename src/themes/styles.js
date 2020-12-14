import mainTheme from "./main";

const mt = mainTheme;

const styles = {
    page: {
        width: '100%',
            height: '92vh',
            position: 'relative',
            background: mainTheme.colorsDark.lightBack
    },
    btn: {
        background: mt.colorsDark.strongYellow,
        color: mt.colorsDark.mainBack,
        fontSize: mt.fonts.size.l,
        fontWeight: 700,
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        boxShadow: '10px 10px 0 ' + mt.colorsDark.mainBack
    }
}


export default styles;