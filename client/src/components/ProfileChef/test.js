import React from 'react';
import { render, wait } from '@testing-library/react';

import ProfileChef from '.';

describe('ProfileChef', () => {
  let wrapper;
  let username;
  let chef;

  beforeEach(() => {
    username = 'gramsey';

    chef = {
      username,
      firstName: 'Gordon',
      lastName: 'Ramsey',
      bio: 'imma celeb chef',
    };

    wrapper = render(<ProfileChef {...chef} />);
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
