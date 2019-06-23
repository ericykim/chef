import React, { FunctionComponent, useState, useEffect } from 'react';
import styles from './styles.css';

import Login from '../Login';

import { setBreakpoints } from 'responsive-jsx';

const App: FunctionComponent = (props) => {
  setBreakpoints({
    Mobile: 320,
    Tablet: 768,
    Desktop: 1080,
  });

  return (
    <div>
      <Login />
    </div>
  );
};

export default App;
