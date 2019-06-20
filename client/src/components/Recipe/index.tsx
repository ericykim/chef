import React, { FunctionComponent } from 'react';
import styles from './styles.css';

import Recipe from '../../entities/recipe';

type Props = {
  recipe: Recipe;
};

const Recipe: FunctionComponent<Props> = ({ recipe }) => {
  return <div>{recipe.title}</div>;
};

export default Recipe;
