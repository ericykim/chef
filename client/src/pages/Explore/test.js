import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { FetchMock } from '@react-mock/fetch';
import { render, wait } from '@testing-library/react';

import Explore from '.';

describe('Explore', () => {
  let labels;

  beforeEach(() => {
    labels = [
      { name: 'asian', recipes: [{ title: 'ramen' }] },
      { name: 'vegetarian', recipes: [{ title: 'salad' }] },
    ];
  });

  it('renders', async () => {
    const { getByTestId } = render(
      <FetchMock
        matcher={'http://localhost:3000/recipe/labels'}
        method={'GET'}
        response={{ status: 200, body: labels }}
      >
        <BrowserRouter>
          <Explore />
        </BrowserRouter>
      </FetchMock>,
    );

    await wait(() => {
      expect(getByTestId('Explore')).toBeInTheDocument();
    });
  });

  it('renders all labels', async () => {
    const { getByText } = render(
      <FetchMock
        matcher={'http://localhost:3000/recipe/labels'}
        method={'GET'}
        response={{ status: 200, body: labels }}
      >
        <BrowserRouter>
          <Explore />
        </BrowserRouter>
      </FetchMock>,
    );

    await wait(() => {
      labels.forEach(({ name }) => {
        expect(getByText(name)).toBeInTheDocument();
      });
    });
  });

  it('renders all recipes of labels', async () => {
    const { getByText } = render(
      <FetchMock
        matcher={'http://localhost:3000/recipe/labels'}
        method={'GET'}
        response={{ status: 200, body: labels }}
      >
        <BrowserRouter>
          <Explore />
        </BrowserRouter>
      </FetchMock>,
    );

    await wait(() => {
      labels.forEach(({ recipes }) => {
        recipes.forEach(({ title }) => {
          expect(getByText(title)).toBeInTheDocument();
        });
      });
    });
  });
});
