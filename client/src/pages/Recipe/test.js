import React from 'react';
import { FetchMock } from '@react-mock/fetch';
import { render, wait } from '@testing-library/react';

import Recipe from '.';

describe('Recipe', () => {
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
        <Recipe match={{ params: { id: recipe.id } }} />
      </FetchMock>,
    );
  });

  it('renders', async () => {
    const { getByTestId } = wrapper;

    await wait(() => {
      expect(getByTestId('Recipe')).toBeInTheDocument();
    });
  });

  // it('back button links to all recipes', async () => {
  //   const { container } = wrapper;

  //   await wait(() => {
  //     expect(container.querySelector()).toBeInTheDocument();
  //   });
  // });
});
