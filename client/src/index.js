import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, BrowserRouter, Route } from 'react-router-dom';

import './index.css';
import 'regenerator-runtime/runtime';

import Authentication from './pages/Authentication';
import App from './pages/App';

const Routes = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path={'/login'}
          render={() => <Authentication mode={'login'} />}
        />
        <Route
          exact
          path={'/register'}
          render={() => <Authentication mode={'register'} />}
        />
        <Route path={'/'} component={App} />
      </Switch>
    </BrowserRouter>
  );
};

ReactDOM.render(<Routes />, document.getElementById('app'));
