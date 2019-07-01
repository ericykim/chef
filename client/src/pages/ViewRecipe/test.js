import React from 'react';
import { FetchMock } from '@react-mock/fetch';
import { render, wait } from '@testing-library/react';

import ViewRecipe from '.';

describe('ViewRecipe', () => {
  let wrapper;
  let recipe;
  let mocks;

  beforeEach(() => {
    recipe = {
      id: '2134-24444-212333',
      title: 'POKE Boll',
      ingredients: ['mushrooms', 'frog leg'],
      directions: ['get high'],
    };

    mocks = [
      {
        matcher: `http://localhost:3000/recipe/${recipe.id}`,
        method: 'GET',
        response: { status: 200, body: recipe },
      },
    ];

    wrapper = render(
      <FetchMock mocks={mocks}>
        <ViewRecipe match={{ params: { id: recipe.id } }} />
      </FetchMock>,
    );
  });

  it('renders', async () => {
    const { getByTestId } = wrapper;

    await wait(() => {
      expect(getByTestId('ViewRecipe')).toBeInTheDocument();
    });
  });

  it('renders recipe title', async () => {
    const { getByText } = wrapper;

    await wait(() => {
      expect(getByText(recipe.title)).toBeInTheDocument();
    });
  });

  it('renders ingredients', async () => {
    const { getByText } = wrapper;

    await wait(() => {
      recipe.ingredients.forEach((ingredient, index) => {
        expect(getByText(`${index + 1}. ${ingredient}`)).toBeInTheDocument();
      });
    });
  });

  it('renders directions', async () => {
    const { getByText } = wrapper;

    await wait(() => {
      recipe.directions.forEach((direction, index) => {
        expect(getByText(`${index + 1}. ${direction}`)).toBeInTheDocument();
      });
    });
  });
});
