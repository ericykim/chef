import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';

import ProfileRecipe from '.';

describe('ProfileRecipe', () => {
  let wrapper;
  let recipe;

  beforeEach(() => {
    recipe = {
      title: 'Tonkotsu Ramen',
      subtitle: "It's a pork ramen",
      pictures: [],
      published: true,
      views: 123,
    };
    wrapper = render(<ProfileRecipe recipe={recipe} />);
  });

  afterEach(cleanup);

  it('renders', () => {
    const { getByTestId } = wrapper;
    expect(getByTestId('ProfileRecipe')).toBeInTheDocument();
  });

  it('renders title and subtitle of recipe', () => {
    const { getByText } = wrapper;
    expect(getByText(recipe.title)).toBeInTheDocument();
    expect(getByText(recipe.subtitle)).toBeInTheDocument();
  });

  it('renders no image if no pictures are found', () => {
    const { container } = wrapper;
    expect(container.querySelector('img')).toBeNull();
  });

  it('shows published state for published recipes', () => {
    const { getByText } = wrapper;
    expect(getByText('Published')).toBeInTheDocument();
  });

  it('shows views if published', () => {
    const { getByText } = wrapper;
    expect(getByText(`${recipe.views} Views`)).toBeInTheDocument();
  });

  it('shows draft state for draft recipes', () => {
    const { getByText } = render(
      <ProfileRecipe recipe={{ ...recipe, published: false }} />,
    );
    expect(getByText('Draft')).toBeInTheDocument();
  });

  it('renders first picture if found', () => {
    const recipeWithPictures = { ...recipe, pictures: ['linkToImage'] };
    const { container } = render(<ProfileRecipe recipe={recipeWithPictures} />);

    expect(
      container.querySelector(`img[src="${recipeWithPictures.pictures[0]}"`),
    ).toBeInTheDocument();
  });
});
