import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import {store} from "./store";
import {ThemeProvider} from "@mui/material";
import {theme} from "./styles/GlobalTheme";
import './styles/index.css'
import { App } from './components/App/App';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

root.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <App/>
        </ThemeProvider>
    </Provider>
);
