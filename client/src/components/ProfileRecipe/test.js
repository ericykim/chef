import React from 'react';
import { FetchMock } from '@react-mock/fetch';
import { BrowserRouter } from 'react-router-dom';
import { render, wait, fireEvent, cleanup } from '@testing-library/react';

import ProfileRecipe from '.';

describe('ProfileRecipe', () => {
  let wrapper;
  let recipe;

  beforeEach(() => {
    recipe = {
      id: 1,
      title: 'Tonkotsu Ramen',
      subtitle: "It's a pork ramen",
      pictures: [],
      published: true,
      views: 123,
    };
  });

  afterEach(cleanup);

  it('renders', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <ProfileRecipe recipe={recipe} />
      </BrowserRouter>,
    );

    expect(getByTestId('ProfileRecipe')).toBeInTheDocument();
  });

  it('renders title and subtitle of recipe', () => {
    const { getByText } = render(
      <BrowserRouter>
        <ProfileRecipe recipe={recipe} />
      </BrowserRouter>,
    );

    expect(getByText(recipe.title)).toBeInTheDocument();
    expect(getByText(recipe.subtitle)).toBeInTheDocument();
  });

  it('renders no image if no pictures are found', () => {
    const { container } = render(
      <BrowserRouter>
        <ProfileRecipe recipe={recipe} />
      </BrowserRouter>,
    );
    expect(container.querySelector('img')).toBeNull();
  });

  it('shows published state for published recipes', () => {
    const { getByText } = render(
      <BrowserRouter>
        <ProfileRecipe recipe={recipe} />
      </BrowserRouter>,
    );
    expect(getByText('Published')).toBeInTheDocument();
  });

  it('shows views if published', () => {
    const { getByText } = render(
      <BrowserRouter>
        <ProfileRecipe recipe={recipe} />
      </BrowserRouter>,
    );
    expect(getByText(`${recipe.views} Views`)).toBeInTheDocument();
  });

  it('shows draft state for draft recipes', () => {
    const { getByText } = render(
      <BrowserRouter>
        <ProfileRecipe recipe={{ ...recipe, published: false }} />,
      </BrowserRouter>,
    );
    expect(getByText('Draft')).toBeInTheDocument();
  });

  it('renders first picture if found', () => {
    const recipeWithPictures = { ...recipe, pictures: ['linkToImage'] };
    const { container } = render(
      <BrowserRouter>
        <ProfileRecipe recipe={recipeWithPictures} />
      </BrowserRouter>,
    );

    expect(
      container.querySelector(`img[src="${recipeWithPictures.pictures[0]}"`),
    ).toBeInTheDocument();
  });

  it('calls remove when delete button is pressed and status returns 200', async () => {
    const removeMock = jest.fn();
    const { getByTestId } = render(
      <BrowserRouter>
        <FetchMock
          matcher={`http://localhost:3000/recipe/${recipe.id}`}
          method={'DELETE'}
          response={{ status: 200 }}
        >
          <ProfileRecipe recipe={recipe} remove={removeMock} />
        </FetchMock>
      </BrowserRouter>,
    );

    fireEvent.click(getByTestId('delete'));

    await wait(() => {
      expect(removeMock).toHaveBeenCalledWith(recipe.id);
    });
  });

  it('does not call remove when delete button is pressed and status returns 304', async () => {
    const removeMock = jest.fn();
    const { getByTestId } = render(
      <BrowserRouter>
        <FetchMock
          matcher={`http://localhost:3000/recipe/${recipe.id}`}
          method={'DELETE'}
          response={{ status: 304, body: {} }}
        >
          <ProfileRecipe recipe={recipe} remove={removeMock} />
        </FetchMock>
      </BrowserRouter>,
    );

    fireEvent.click(getByTestId('delete'));

    await wait(() => {
      expect(removeMock).not.toHaveBeenCalled();
    });
  });
});
