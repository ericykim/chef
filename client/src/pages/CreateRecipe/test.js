import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';

import CreateRecipe from '.';

describe('CreateRecipe', () => {
  it('renders', () => {
    const { getByTestId } = render(<CreateRecipe />);
    expect(getByTestId('CreateRecipe')).toBeInTheDocument();
  });
});
