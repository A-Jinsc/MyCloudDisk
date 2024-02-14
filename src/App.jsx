import React from 'react';
import {createBrowserRouter, RouterProvider, Navigate} from 'react-router-dom'
import routes from './routes'
import Header from './components/Header'
import Login from './views/login'
import Home from './views/home'

export default function App() {
    const router = createBrowserRouter(routes)

    return (
        <div>
            <Header/>
            <RouterProvider router={router} />
        </div>
    );
}