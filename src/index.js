import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter/*, HashRouter */} from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
<BrowserRouter>
<App/>
</BrowserRouter>
);



