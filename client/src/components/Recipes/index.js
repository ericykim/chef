import React, { useState } from 'react';
import { Empty } from 'antd';
import { isEmpty } from 'lodash';
import { orderBy } from 'lodash';

import styles from './styles.css';

/**
 * Display container that orders the recipes.
 */
const Recipes = ({ recipes, $component, empty }) => {
  const [localRecipes, setLocalRecipes] = useState(
    orderBy(recipes, 'published', 'desc'),
  );

  const remove = (recipeId) =>
    setLocalRecipes(localRecipes.filter(({ id }) => recipeId !== id));

  return (
    <div data-testid={'Recipes'}>
      {isEmpty(localRecipes)
        ? empty
        : localRecipes.map((recipe) => (
            <$component
              className={styles.component}
              key={recipe.id}
              recipe={recipe}
              remove={remove}
            />
          ))}
    </div>
  );
};

export default Recipes;
