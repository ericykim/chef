import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { orderBy } from 'lodash';
import { render, getByText } from '@testing-library/react';

import Recipes from '.';
import ProfileRecipe from '../ProfileRecipe';

describe('Recipes', () => {
  let recipes;
  let sorted;

  beforeEach(() => {
    recipes = [
      {
        id: 1,
        title: 'Tonkotsu Ramen',
        subtitle: "It's a pork ramen",
        pictures: [],
        published: false,
        views: 0,
      },
      {
        id: 2,
        title: 'choc chips',
        subtitle: 'cookies!',
        pictures: [],
        published: true,
        views: 123,
      },
    ];
    sorted = orderBy(recipes, 'published', 'desc');
  });

  it('renders', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Recipes recipes={recipes} $component={ProfileRecipe} />,
      </BrowserRouter>,
    );
    expect(getByTestId('Recipes')).toBeInTheDocument();
  });

  it('renders all recipes based on given component', () => {
    const { getAllByTestId } = render(
      <BrowserRouter>
        <Recipes
          recipes={recipes}
          component={ProfileRecipe}
          $component={ProfileRecipe}
        />
      </BrowserRouter>,
    );
    expect(getAllByTestId('ProfileRecipe').length).toBe(recipes.length);
  });

  it('renders recipes in the order: published, draft', () => {
    const { getAllByTestId } = render(
      <BrowserRouter>
        <Recipes
          recipes={recipes}
          component={ProfileRecipe}
          $component={ProfileRecipe}
        />
      </BrowserRouter>,
    );

    const recipeNodes = getAllByTestId('ProfileRecipe');
    recipeNodes.forEach((recipeNode, index) =>
      expect(getByText(recipeNode, sorted[index].title)).toBeInTheDocument(),
    );
  });

  it('renders empty when recipes is empty', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Recipes
          recipes={[]}
          component={ProfileRecipe}
          $component={ProfileRecipe}
          empty={<div data-testid={'Empty'} />}
        />
      </BrowserRouter>,
    );

    expect(getByTestId('Empty')).toBeInTheDocument();
  });
});
