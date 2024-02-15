import Login from "../pages/login/index.jsx";
import Main from "../pages/main/index.jsx";
import ShowContent from "../components/ShowContent"
import {Navigate} from "react-router-dom";
import React from "react";

export default [
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/main',
        element: <Main/>,
        children: [
            {
                path: 'all',
                element: <ShowContent/>
            },
            {
                path: 'video',
                element: <ShowContent/>
            },
            {
                path: 'music',
                element: <ShowContent/>
            },
            {
                path: 'picture',
                element: <ShowContent/>
            },
            {
                path: 'document',
                element: <ShowContent/>
            },
            {
                path: 'other',
                element: <ShowContent/>
            },
        ]
    },
    {
        path: '/',
        element: <Navigate to='/login'/>
    }
]