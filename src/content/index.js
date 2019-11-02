const tonkotsuRecipe = {
  id: 'tonkotsu-ramen', // required
  title: 'Tonkotsu Ramen', // required
  subtitle: 'Traditional pork based ramen',
  description: '',
  ingredients: [
    '1 lb of pork',
    '1/2 lb of egg noodles',
    'Cabbage',
    '2 cloves of garlic',
  ],
  directions: [
    'Roast pork',
    'Prepare pork broth',
    'Boil noodles and cabbage',
    'Put together bowl of ramen',
  ],
  pictures: [
    'https://www.seriouseats.com/recipes/images/2012/02/20120227-tonkotsu-ramen-broth-pork-fat-26.jpg',
  ],
  preparationTime: 10,
  cookTime: 60,
};

export const chef = {
  id: '123',
  firstName: 'Gordon',
  lastName: 'Ramsey',
  email: 'gramsey@gmail.com',
  profilePicture: null,
  recipes: [tonkotsuRecipe], // add recipes to this array
};
