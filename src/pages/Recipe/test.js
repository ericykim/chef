import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { FetchMock } from '@react-mock/fetch';
import { render, wait } from '@testing-library/react';

import Recipe from '.';
import UserContext from '../../contexts/UserContext';

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
        <BrowserRouter>
          <UserContext.Provider value={['', () => {}]}>
            <Recipe testMatch={{ params: { id: recipe.id } }} />
          </UserContext.Provider>
        </BrowserRouter>
      </FetchMock>,
    );
  });

  it('renders component and recipe card', async () => {
    const { getAllByTestId } = wrapper;

    await wait(() => {
      expect(getAllByTestId('Recipe').length).toBe(2);
    });
  });
});
