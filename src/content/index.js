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

const fluffyPancakes = {
  id: 'fluffy-pancakes', // required
  title: 'Fluffy Pancakes', // required
  subtitle: 'Good Ole Pancakes',
  description:
    'Tall and fluffy. These pancakes are just right. Topped with strawberries and whipped cream, they are impossible to resist',
  ingredients: [
    '3/4 cup milk',
    '2 tablespoons white vinegar',
    '1 cup all-purpose flour',
    '2 tablespoons white sugar',
    '1 teaspoon baking powder',
    '1/2 teaspoon baking soda',
    '1/2 teaspoon salt',
    '1 egg',
    '2 tablespoons butter, melted',
    'cooking spray',
  ],
  directions: [
    'Combine milk with vinegar in a medium bowl and set aside for 5 minutes to "sour',
    'Combine flour, sugar, baking powder, baking soda, and salt in a large mixing bowl. Whisk egg and butter into "soured" milk. Pour the flour mixture into the wet ingredients and whisk until lumps are gone',
    'Heat a large skillet over medium heat, and coat with cooking spray. Pour 1/4 cupfuls of batter onto the skillet, and cook until bubbles appear on the surface. Flip with a spatula, and cook until browned on the other side',
  ],
  pictures: [
    'https://images.media-allrecipes.com/userphotos/720x405/5079227.jpg',
  ],
  preparationTime: 10,
  cookTime: 25,
};

const strawberrySpinachSalad = {
  id: 'strawberry-spinach-salad', // required
  title: 'Strawberry Spinach Salad', // required
  subtitle: 'Great Summer Salad',
  description:
    'Healthy is anything but dull when there’s a giant Strawberry Spinach Salad with Poppyseed Dressing waiting for lunch. It’s colorful, naturally sweet, and as wonderful as it gets.',
  ingredients: [
    'Your favorite dressing',
    'baby spinach',
    'toasted pecans',
    'bright juicy strawberries',
  ],
  directions: [
    'Combine the spinach and greens with toasted pecans',
    'Slice the strawberries',
    'Combine the strawberries to the spinach and pecans',
    'Drizzle the dressing and gently toss',
  ],
  pictures: [
    'https://www.culinaryhill.com/wp-content/uploads/2019/07/Strawberry-Spinach-Salad-Culinary-Hill-LR-07.jpg',
  ],
  preparationTime: 15,
  cookTime: 5,
};

export const chef = {
  id: '123',
  firstName: 'Gordon',
  lastName: 'Ramsey',
  email: 'gramsey@gmail.com',
  profilePicture:
    'https://yt3.ggpht.com/a/AGF-l7_6r_NR0iZWw6Tm_eDIiYy35mIUoPqKPUCfgw=s900-c-k-c0xffffffff-no-rj-mo',
  recipes: [tonkotsuRecipe, fluffyPancakes, strawberrySpinachSalad], // add recipes to this array
};
