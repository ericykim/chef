import React from 'react';
import { FetchMock } from '@react-mock/fetch';
import { render, wait } from '@testing-library/react';

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
        <Profile match={{ params: { username } }} />
      </FetchMock>,
    );
  });

  it('renders chef name and username', async () => {
    const { getByText } = wrapper;

    await wait(() => {
      expect(getByText(username)).toBeInTheDocument();
      expect(
        getByText(`${chef.firstName} ${chef.lastName}`),
      ).toBeInTheDocument();
    });
  });
});