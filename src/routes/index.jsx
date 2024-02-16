import Login from "../pages/login/index.jsx";
import Main from "../pages/main/index.jsx";
import ShowContent from "../components/ShowContent"
import Home from '../views/home'
import Share from '../views/share'
import Recycle from '../views/recycle'
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
                path: 'home',
                element: <Home/>,
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
                path: 'share',
                element: <Share/>
            },
            {
                path: 'recycle',
                element: <Recycle/>
            }
        ]
    },
    {
        path: '/',
        element: <Navigate to='/login'/>
    }
]