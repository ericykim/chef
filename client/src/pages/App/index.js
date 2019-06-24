import React, { useState, useEffect } from 'react';
import styles from './styles.css';

import Authentication from '../Authentication';

import { setBreakpoints } from 'responsive-jsx';

const App = (props) => {
  setBreakpoints({
    Mobile: 320,
    Tablet: 768,
    Desktop: 1080,
  });

  return (
    <div>
      <Authentication />
    </div>
  );
};

export default App;
