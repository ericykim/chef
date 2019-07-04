import React from 'react';
import { Empty } from 'antd';
import { isEmpty } from 'lodash';
import { orderBy } from 'lodash';

import styles from './styles.css';

/**
 * Display container that orders the recipes.
 */
const Recipes = ({ recipes, $component, empty }) => {
  const ordered = orderBy(recipes, 'published', 'desc');

  return (
    <div data-testid={'Recipes'}>
      {isEmpty(recipes)
        ? empty
        : ordered.map((recipe) => (
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
