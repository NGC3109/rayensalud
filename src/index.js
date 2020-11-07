import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  Switch,
  Route,
  HashRouter
} from "react-router-dom";

import DetailTutorial from './components/DetailTutorial'
import NewTutorial from './components/NewTutorial'

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

ReactDOM.render(
                <HashRouter>
                    <Switch>
                        <Route exact path="/" component={App} />
                        <Route path="/detail/:idTutorial" component={DetailTutorial} />
                        <Route path="/created/" component={NewTutorial} />
                    </Switch>
                </HashRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
