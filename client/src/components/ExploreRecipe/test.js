import React from 'react';
import { render } from '@testing-library/react';

import ExploreRecipe from '.';

describe('ExploreRecipe', () => {
  let recipe;

  beforeEach(() => {
    recipe = {
      title: 'Ramen',
      subtitle: 'hot soup',
    };
  });

  it('renders', () => {
    const { getByTestId } = render(<ExploreRecipe recipe={recipe} />);
    expect(getByTestId('ExploreRecipe')).toBeInTheDocument();
  });

  it('renders title and subtitle of recipe', () => {
    const { getByText } = render(<ExploreRecipe recipe={recipe} />);
    expect(getByText(recipe.title)).toBeInTheDocument();
    expect(getByText(recipe.subtitle)).toBeInTheDocument();
  });
});
