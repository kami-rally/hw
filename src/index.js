import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Page from './Page';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Page url="http://localhost:3001/api/cards" pollInterval={200000} />, document.getElementById('root'));
registerServiceWorker();
