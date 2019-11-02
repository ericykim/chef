import React, { useState } from 'react';

export const useChef = () => {
  const [chef, setChef] = useState({});

  const findRecipe = (recipeId) => {
    const recipe = chef.recipes.find(({ id }) => recipeId === id);
    return recipe;
  };

  const addRecipe = (recipe) =>
    setChef({ ...chef, recipes: chef.recipes.concat(recipe) });

  return { chef, setChef, findRecipe, addRecipe };
};
