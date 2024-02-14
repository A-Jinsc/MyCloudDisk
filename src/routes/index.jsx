import Login from "../views/login/index.jsx";
import Home from "../views/home/index.jsx";
import {Navigate} from "react-router-dom";
import React from "react";

export default [
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/home',
        element: <Home/>
    },
    {
        path: '/',
        element: <Navigate to='/login'/>
    }
]