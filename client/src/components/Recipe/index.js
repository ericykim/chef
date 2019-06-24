import React from 'react';
import styles from './styles.css';

import Recipe from '../../entities/recipe';

const Recipe = ({ recipe }) => {
  return <div>{recipe.title}</div>;
};

export default Recipe;
