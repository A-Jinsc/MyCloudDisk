import React from 'react';
// import {useRoutes} from 'react-router-dom'
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import routes from './routes'
import Header from './components/Header'

export default function App() {
    // let element = useRoutes(routes)
    const router = createBrowserRouter(routes)

    return (
        <div>
            <Header/>
            <RouterProvider router={router} />
        </div>
    );
}