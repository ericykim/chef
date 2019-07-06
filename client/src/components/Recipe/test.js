import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Recipe from '.';

describe('Recipe', () => {
  let wrapper;
  let recipe;

  beforeEach(() => {
    recipe = {
      id: '2134-24444-212333',
      title: 'POKE Boll',
      subtitle: 'basically sushi bowl',
      description: 'it is in fact good',
      ingredients: ['mushrooms', 'frog leg'],
      directions: ['get high'],
      pictures: ['pic1', 'pic2'],
      preparationTime: 5,
      cookTime: 20,
    };

    wrapper = render(<Recipe recipe={recipe} />);
  });

  it('renders', () => {
    const { getByTestId } = wrapper;

    expect(getByTestId('Recipe')).toBeInTheDocument();
  });

  it('renders recipe title, subtitle, and description', () => {
    const { getByText } = wrapper;

    expect(getByText(recipe.title)).toBeInTheDocument();
    expect(getByText(recipe.subtitle)).toBeInTheDocument();
    expect(getByText(recipe.description)).toBeInTheDocument();
  });

  it('renders ingredients', () => {
    const { getByText } = wrapper;

    recipe.ingredients.forEach((ingredient, index) => {
      expect(getByText(ingredient)).toBeInTheDocument();
    });
  });

  it('renders directions', () => {
    const { getByText } = wrapper;

    recipe.directions.forEach((direction, index) => {
      expect(getByText(direction)).toBeInTheDocument();
    });
  });

  it('renders first image if exists', () => {
    const { container } = wrapper;

    expect(
      container.querySelector(`img[src="${recipe.pictures[0]}"]`),
    ).toBeInTheDocument();
  });

  it('changes image when dot is clicked', () => {
    const { container, getByTestId } = wrapper;

    expect(
      container.querySelector(`img[src="${recipe.pictures[0]}"]`),
    ).toBeInTheDocument();

    fireEvent.click(getByTestId(`dot-${1}`));

    expect(
      container.querySelector(`img[src="${recipe.pictures[1]}"]`),
    ).toBeInTheDocument();
  });

  it('renders prep, cook, and ready times', () => {
    const { getByText } = wrapper;

    expect(getByText(`${recipe.preparationTime} mins`)).toBeInTheDocument();
    expect(getByText(`${recipe.cookTime} mins`)).toBeInTheDocument();
    expect(
      getByText(`${recipe.cookTime + recipe.preparationTime} mins`),
    ).toBeInTheDocument();
  });
});
