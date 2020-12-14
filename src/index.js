import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebaseApp from 'firebase/app'
import 'firebase/analytics'

const firebaseConfig = {
    apiKey: process.env["REACT_APP_FIREBASE_KEY"],
    authDomain: "utrudnienia-drogowe.firebaseapp.com",
    projectId: "utrudnienia-drogowe",
    storageBucket: "utrudnienia-drogowe.appspot.com",
    messagingSenderId: process.env["REACT_APP_FIREBASE_SID"],
    appId: process.env["REACT_APP_FIREBASE_AID"],
    measurementId: process.env["REACT_APP_FIREBASE_MID"]
};

firebaseApp.initializeApp(firebaseConfig);
firebaseApp.analytics();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
