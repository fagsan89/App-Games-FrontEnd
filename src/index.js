import React from 'react';
import ReactDOM from 'react-dom';
import { GlobalStyle } from './styles/global'
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from "./routes";
import Header from "./pages/Header"
import AuthProvider from './contexts/auth'


ReactDOM.render(
  <React.StrictMode>
    
    <GlobalStyle/>

    <AuthProvider>
        <Header/>
        <Routes />
    </AuthProvider>
       
  </React.StrictMode>,
  document.getElementById('root')
);


