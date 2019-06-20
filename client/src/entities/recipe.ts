interface Recipe {
  author: string;
  title: string;
  subtitle: string;
  description: string;
  preparationTime: number;
  cookTime: number;
  readyTime: number;
  ingredients: Array<string>;
  directions: Array<string>;
  labels: Array<string>;
  published: boolean;
}

export default Recipe;
