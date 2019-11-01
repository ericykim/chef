export const recipes = [];

export const chef = {
  recipes,
  firstName: 'Gordon',
  lastName: 'Ramsey',
  email: 'gramsey@gmail.com',
  profilePicture: null,
};

export const addRecipe = (recipe) => recipes.push(recipe);

export const findRecipe = (recipeId) =>
  recipes.find(({ id }) => id === recipeId);
