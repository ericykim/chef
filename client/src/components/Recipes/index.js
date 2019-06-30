import React from 'react';
import { orderBy } from 'lodash';

import styles from './styles.css';

/**
 * Display container that orders the recipes.
 */
const Recipes = ({ recipes, $component }) => {
  const ordered = orderBy(recipes, 'published', 'desc');

  return (
    <div data-testid={'Recipes'}>
      {ordered.map((recipe) => (
        <$component
          className={styles.component}
          key={recipe.id}
          recipe={recipe}
        />
      ))}
    </div>
  );
};

export default Recipes;
