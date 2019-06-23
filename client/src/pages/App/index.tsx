import React, { FunctionComponent, useState, useEffect } from 'react';
import styles from './styles.css';

import wretch from 'wretch';
import Recipe from '../../components/Recipe';
import RecipeType from '../../entities/Recipe';
import Login from '../Login';

const App: FunctionComponent = (props) => {
  return (
    <div>
      <Login />
    </div>
  );
};

export default App;
