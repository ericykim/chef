import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { setBreakpoints } from 'responsive-jsx';

import Authentication from '../Authentication';
import styles from './styles.css';

const App = (props) => {
  return (
    <BrowserRouter>
      <Route path={'/login'} render={() => <Authentication mode={'login'} />} />
      <Route
        path={'/register'}
        render={() => <Authentication mode={'register'} />}
      />
    </BrowserRouter>
  );
};

export default App;
