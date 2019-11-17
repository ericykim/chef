import React, { useState } from 'react';
import { Empty } from 'antd';
import { isEmpty } from 'lodash';
import { orderBy } from 'lodash';

import styles from './styles.css';

/**
 * Display container that orders the recipes.
 */
const Recipes = ({ recipes, $component, empty }) => {
  return (
    <div data-testid={'Recipes'}>
      {isEmpty(recipes)
        ? empty
        : recipes.map((recipe) => (
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
