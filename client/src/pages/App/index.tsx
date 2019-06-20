import React, { FunctionComponent, useState, useEffect } from 'react';
import styles from './styles.css';

import wretch from 'wretch';
import Recipe from '../../components/Recipe';
import RecipeType from '../../entities/Recipe';

const App: FunctionComponent = (props) => {
  const [recipe, setRecipe] = useState<RecipeType>({} as RecipeType);

  useEffect(() => {
    wretch('http://localhost:3000/recipe/f5b25ae8-4ec8-4656-ba03-3a92024bd278')
      .get()
      .json((json) => setRecipe(json as RecipeType));
  }, []);

  return (
    <div>
      <Recipe recipe={recipe} />
    </div>
  );
};

export default App;
