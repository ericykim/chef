import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import './index.css';
import 'regenerator-runtime/runtime';

import Authentication from './pages/Authentication';
import App from './pages/App';

const Routes = (props) => {
  return (
    <BrowserRouter>
      <Route exact path={'/'} component={App} />
      <Route path={'/login'} render={() => <Authentication mode={'login'} />} />
      <Route
        path={'/register'}
        render={() => <Authentication mode={'register'} />}
      />
    </BrowserRouter>
  );
};

ReactDOM.render(<Routes />, document.getElementById('app'));
