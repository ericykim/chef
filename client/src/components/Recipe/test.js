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
  });

  it('renders', () => {
    const { getByTestId } = render(<Recipe recipe={recipe} />);

    expect(getByTestId('Recipe')).toBeInTheDocument();
  });

  it('renders recipe title, subtitle, and description', () => {
    const { getByText } = render(<Recipe recipe={recipe} />);

    expect(getByText(recipe.title)).toBeInTheDocument();
    expect(getByText(recipe.subtitle)).toBeInTheDocument();
    expect(getByText(recipe.description)).toBeInTheDocument();
  });

  it('renders ingredients', () => {
    const { getByText } = render(<Recipe recipe={recipe} />);

    recipe.ingredients.forEach((ingredient, index) => {
      expect(getByText(ingredient)).toBeInTheDocument();
    });
  });

  it('renders directions', () => {
    const { getByText } = render(<Recipe recipe={recipe} />);

    recipe.directions.forEach((direction, index) => {
      expect(getByText(direction)).toBeInTheDocument();
    });
  });

  it('renders first image if exists', () => {
    const { container } = render(<Recipe recipe={recipe} />);

    expect(
      container.querySelector(`img[src="${recipe.pictures[0]}"]`),
    ).toBeInTheDocument();
  });

  it('changes image when dot is clicked', () => {
    const { container, getByTestId } = render(<Recipe recipe={recipe} />);

    expect(
      container.querySelector(`img[src="${recipe.pictures[0]}"]`),
    ).toBeInTheDocument();

    fireEvent.click(getByTestId(`dot-${1}`));

    expect(
      container.querySelector(`img[src="${recipe.pictures[1]}"]`),
    ).toBeInTheDocument();
  });

  it('renders prep, cook, and ready times', () => {
    const { getByText } = render(<Recipe recipe={recipe} />);

    expect(getByText(`${recipe.preparationTime} mins`)).toBeInTheDocument();
    expect(getByText(`${recipe.cookTime} mins`)).toBeInTheDocument();
    expect(
      getByText(`${recipe.cookTime + recipe.preparationTime} mins`),
    ).toBeInTheDocument();
  });

  it('does not render prep, cook, and ready times if not available', () => {
    const { queryByText } = render(
      <Recipe recipe={{ ...recipe, preparationTime: null, cookTime: null }} />,
    );

    expect(queryByText('Prep')).toBeNull();
    expect(queryByText('Cooking')).toBeNull();
    expect(queryByText('Total')).toBeNull();
  });

  it('renders only prep and total if cook does not exist', () => {
    const { getAllByText, queryByText } = render(
      <Recipe recipe={{ ...recipe, preparationTime: 1, cookTime: null }} />,
    );

    expect(getAllByText(`1 mins`).length).toBe(2);
    expect(queryByText('Cooking')).toBeNull();
  });

  it('renders only cook and total if prep does not exist', () => {
    const { getAllByText, queryByText } = render(
      <Recipe recipe={{ ...recipe, cookTime: 1, preparationTime: null }} />,
    );

    expect(getAllByText(`1 mins`).length).toBe(2);
    expect(queryByText('Prep')).toBeNull();
  });
});
