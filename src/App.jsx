import React from 'react';
import {createBrowserRouter, RouterProvider, Navigate} from 'react-router-dom'
import routes from './routes'
import Header from './components/Header'

export default function App() {
    const router = createBrowserRouter(routes)

    return (
        <div>
            <Header/>
            <RouterProvider router={router} />
        </div>
    );
}