import React from 'react';
import { render } from 'react-dom';
import './index.scss';
import App from './scenes/App/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/reset.scss';
import './styles/common.scss';
import 'semantic-ui-css/semantic.min.css'


const target = document.getElementById('root');
render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
    target
);