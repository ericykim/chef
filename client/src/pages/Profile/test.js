import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';

import Profile from '.';

describe('Profile', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(<Profile />);
  });

  it('renders chef name and username', () => {
    const { getByText } = wrapper;
  });
});
