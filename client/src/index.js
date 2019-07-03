import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Switch, BrowserRouter, Route } from 'react-router-dom';

import './index.css';
import 'regenerator-runtime/runtime';

import Authentication from './pages/Authentication';
import UserContext from './contexts/UserContext';
import App from './pages/App';

const Routes = (props) => {
  const userState = useState({});

  return (
    <UserContext.Provider value={userState}>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path={'/login'}
            render={() => <Authentication mode={'Login'} />}
          />
          <Route
            exact
            path={'/register'}
            render={() => <Authentication mode={'Register'} />}
          />
          <Route path={'/'} component={App} />
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

ReactDOM.render(<Routes />, document.getElementById('app'));
