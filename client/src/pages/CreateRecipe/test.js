import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ordinal from 'ordinal-number-suffix';
import { render, fireEvent } from '@testing-library/react';
import v4 from 'uuid/v4';

import UserContext from '../../contexts/UserContext';
import CreateRecipe from '.';

describe('CreateRecipe', () => {
  it('renders', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <UserContext.Provider value={[{ id: v4() }, () => {}]}>
          <CreateRecipe />
        </UserContext.Provider>
      </BrowserRouter>,
    );
    expect(getByTestId('CreateRecipe')).toBeInTheDocument();
  });

  it('renders title, subtitle, description input', () => {
    const { getByPlaceholderText } = render(
      <BrowserRouter>
        <UserContext.Provider value={[{ id: v4() }, () => {}]}>
          <CreateRecipe />
        </UserContext.Provider>
      </BrowserRouter>,
    );

    expect(getByPlaceholderText('Title')).toBeInTheDocument();
    expect(getByPlaceholderText('Subtitle')).toBeInTheDocument();
    expect(getByPlaceholderText('Description')).toBeInTheDocument();
  });

  it('renders only first ingredient and direction inputs', () => {
    const { getByPlaceholderText, queryByPlaceholderText } = render(
      <BrowserRouter>
        <UserContext.Provider value={[{ id: v4() }, () => {}]}>
          <CreateRecipe />
        </UserContext.Provider>
      </BrowserRouter>,
    );

    expect(
      getByPlaceholderText(`${ordinal(1)} ingredient`),
    ).toBeInTheDocument();
    expect(queryByPlaceholderText(`${ordinal(2)} ingredient`)).toBeNull();

    expect(getByPlaceholderText(`${ordinal(1)} direction`)).toBeInTheDocument();
    expect(queryByPlaceholderText(`${ordinal(2)} direction`)).toBeNull();
  });

  it('renders Times component', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <UserContext.Provider value={[{ id: v4() }, () => {}]}>
          <CreateRecipe />
        </UserContext.Provider>
      </BrowserRouter>,
    );

    expect(getByTestId('Times')).toBeInTheDocument();
  });

  it('renders two DynamicLists', () => {
    const { getAllByTestId } = render(
      <BrowserRouter>
        <UserContext.Provider value={[{ id: v4() }, () => {}]}>
          <CreateRecipe />
        </UserContext.Provider>
      </BrowserRouter>,
    );

    expect(getAllByTestId('DynamicList').length).toBe(2);
  });

  it('add new ingredient and direction inputs when adding more fields', () => {
    const { getByPlaceholderText, queryByPlaceholderText, getByText } = render(
      <BrowserRouter>
        <UserContext.Provider value={[{ id: v4() }, () => {}]}>
          <CreateRecipe />
        </UserContext.Provider>
      </BrowserRouter>,
    );

    expect(queryByPlaceholderText(`${ordinal(2)} direction`)).toBeNull();
    expect(queryByPlaceholderText(`${ordinal(2)} ingredient`)).toBeNull();

    fireEvent.click(getByText('Add direction'));
    fireEvent.click(getByText('Add ingredient'));

    expect(getByPlaceholderText(`${ordinal(2)} direction`)).toBeInTheDocument();
    expect(
      getByPlaceholderText(`${ordinal(2)} ingredient`),
    ).toBeInTheDocument();
  });

  it('renders delete button on subsequent fields only', () => {
    const {
      container,
      getByPlaceholderText,
      queryByPlaceholderText,
      getByText,
    } = render(
      <BrowserRouter>
        <UserContext.Provider value={[{ id: v4() }, () => {}]}>
          <CreateRecipe />
        </UserContext.Provider>
      </BrowserRouter>,
    );

    expect(queryByPlaceholderText(`${ordinal(2)} direction`)).toBeNull();
    expect(queryByPlaceholderText(`${ordinal(2)} ingredient`)).toBeNull();

    fireEvent.click(getByText('Add direction'));
    fireEvent.click(getByText('Add ingredient'));

    expect(getByPlaceholderText(`${ordinal(2)} direction`)).toBeInTheDocument();
    expect(
      getByPlaceholderText(`${ordinal(2)} ingredient`),
    ).toBeInTheDocument();

    expect(container.querySelectorAll('span.ant-input-suffix').length).toBe(2);
  });

  it('delete button removes corresponding field', () => {
    const {
      container,
      getByText,
      getByPlaceholderText,
      getByDisplayValue,
      queryByDisplayValue,
    } = render(
      <BrowserRouter>
        <UserContext.Provider value={[{ id: v4() }, () => {}]}>
          <CreateRecipe />
        </UserContext.Provider>
      </BrowserRouter>,
    );

    fireEvent.click(getByText('Add ingredient'));
    fireEvent.click(getByText('Add ingredient'));
    fireEvent.change(getByPlaceholderText(`${ordinal(2)} ingredient`), {
      target: { value: 'ingredient 2' },
    });
    fireEvent.change(getByPlaceholderText(`${ordinal(2)} ingredient`), {
      target: { value: 'ingredient 3' },
    });

    fireEvent.click(container.querySelector('span.ant-input-suffix'));

    expect(getByDisplayValue('ingredient 3')).toBeInTheDocument();
    expect(queryByDisplayValue('ingredient 2')).toBeNull();
  });
});
