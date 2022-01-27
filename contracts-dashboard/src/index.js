import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';

import Amplify, { Auth } from 'aws-amplify'
import config from './config'
// import config from './aws-exports'
// import { CognitoAccessToken } from 'amazon-cognito-identity-js';
// Amplify.configure(config)
// Auth.configure(config);
Amplify.configure({
  Auth : {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  }
})


ReactDOM.render(
    <App />
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
