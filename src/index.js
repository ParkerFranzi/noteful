import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import Main from './Main/Main'

ReactDOM.render(
    <BrowserRouter>
        <Main />
    </BrowserRouter>,
document.getElementById('root'));