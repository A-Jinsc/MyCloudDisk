import React from 'react';
import ReactDOM from 'react-dom/client'
import Header from './components/Header'
import Login from './views/login'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Header/>
        <Login/>
    </React.StrictMode>
,
)
