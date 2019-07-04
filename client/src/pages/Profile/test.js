import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { FetchMock } from '@react-mock/fetch';
import { render, wait } from '@testing-library/react';
import UserContext from '../../contexts/UserContext';

import Profile from '.';

describe('Profile', () => {
  let wrapper;
  let mocks;
  let username;
  let chef;

  beforeEach(() => {
    username = 'gramsey';

    chef = {
      username,
      firstName: 'Gordon',
      lastName: 'Ramsey',
      recipes: [],
      bio: 'imma celeb chef',
    };

    mocks = [
      {
        matcher: `http://localhost:3000/chef/${username}`,
        method: 'GET',
        response: { status: 200, body: chef },
      },
    ];

    wrapper = render(
      <FetchMock mocks={mocks}>
        <BrowserRouter>
          <UserContext.Provider value={[chef.username, () => {}]}>
            <Profile match={{ params: { username } }} />
          </UserContext.Provider>
        </BrowserRouter>
      </FetchMock>,
    );
  });

  it('renders', async () => {
    const { getByTestId } = wrapper;

    await wait(() => {
      expect(getByTestId('Profile')).toBeInTheDocument();
    });
  });

  it('renders ProfileChef', async () => {
    const { getByTestId } = wrapper;

    await wait(() => {
      expect(getByTestId('ProfileChef')).toBeInTheDocument();
    });
  });

  it('renders Empty if recipes is empty', async () => {
    const { getByText, getByTestId } = wrapper;

    await wait(() => {
      expect(getByTestId('Empty')).toBeInTheDocument();
      expect(getByText('Create a recipe')).toBeInTheDocument();
    });
  });
});
