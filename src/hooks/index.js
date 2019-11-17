import React, { useState } from 'react';

export const useChef = () => {
  const [chef, setChef] = useState({});

  const findRecipe = (recipeId) => {
    const recipe = chef.recipes.find(({ id }) => recipeId === id);
    return recipe;
  };

  const addRecipe = (recipe) =>
    setChef({ ...chef, recipes: chef.recipes.concat(recipe) });

  const updateRecipe = (recipe) => {
    const restOfRecipes = chef.recipes.filter(({ id }) => id !== recipe.id);
    setChef({ ...chef, recipes: restOfRecipes.concat(recipe) });
  };

  const removeRecipe = (recipeId) => {
    setChef({
      ...chef,
      recipes: chef.recipes.filter(({ id }) => recipeId !== id),
    });
  };

  return { chef, setChef, findRecipe, addRecipe, updateRecipe, removeRecipe };
};
