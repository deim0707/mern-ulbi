import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {store} from "./rootStore";
import App from './components/app/App.jsx';
import 'antd/dist/antd.css';
import "./index.css";

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);

