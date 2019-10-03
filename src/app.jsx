import React from 'react';
import { render } from 'react-dom';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import MainController from './components/MainController';



if(module.hot) {
    module.hot.accept();
}

require('./sass/main.scss');
require('./sass/mobile.scss');

render(
  <MainController />
  ,
  document.querySelector('#container')
);
