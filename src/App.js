import React, {useEffect, useState} from 'react'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import MapScreen from "./screens/MapScreen";
import DataService from "./services/DataService";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LoadingScreen from "./screens/LoadingScreen";
import mainTheme from "./themes/main";
import MissingScreen from "./screens/404";
import NotLoaded from "./screens/NotLoaded";


function App() {

    const [time, setTime] = useState('')
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [mode, setMode] = useState(true);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [serverError, setServerError] = useState(false);

    //chance to do a database that store last info
    useEffect(() => {
        const dataService = new DataService();

        dataService.gddikData().then(r => {
            if(!r[1])
            {
                setServerError(true);
                toast.error('Nie udało się pobrać danych z gddkia. Spróbuj ponownie później.');
                return;
            }

            const [date, time] = r[0][0].split('T');
            setData(r[0][1]);
            setTime(time + ' ' + date);
            setIsLoading(false);
        });

        //dataService.bingData(); found new api -> maybe add new map?

    }, [])



    return (
        <div style={app}>
            <ToastContainer />
            <Router>
                <Header setMode={setMode} mode={mode}/>
                <Switch>
                    <Route exact path='/'>
                        {(serverError) ? <NotLoaded mode={mode} /> : <HomeScreen mode={mode}/>}
                    </Route>
                    <Route path='/mapgddik'>
                        {
                            () => {
                            if(serverError)
                                return <NotLoaded mode={mode} />
                            else
                                return (isLoading) ? <LoadingScreen mode={mode} /> : <MapScreen mapLoaded={mapLoaded} setMapLoaded={setMapLoaded} mode={mode} data={data} time={time} loading={isLoading}/>
                            }
                        }
                    </Route>
                    <Route path='*'>
                        <MissingScreen mode={mode}/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

const app = {
    padding: 0,
    margin: 0,
    width: '100vw',
    height: '100vh',
    position: 'relative',
    fontFamily: mainTheme.fonts.family
}

export default App;
