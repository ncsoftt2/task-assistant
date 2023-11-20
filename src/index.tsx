import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import {store} from "app/model/store";
import {ThemeProvider} from "@mui/material";
import './app/styles/index.css'
import { RouterProvider } from 'react-router-dom';
import {theme} from "app/styles/GlobalTheme";
import {router} from "app/providers/router";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

root.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <RouterProvider router={router}/>
        </ThemeProvider>
    </Provider>
);
