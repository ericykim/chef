import React from 'react';
import { render, wait, fireEvent } from '@testing-library/react';

import Times from '.';

describe('Times', () => {
  let preparationTime;
  let cookTime;
  let setPreparationTimeMock;
  let setCookTimeMock;

  beforeEach(() => {
    preparationTime = 2;
    cookTime = 10;
    setPreparationTimeMock = jest.fn();
    setCookTimeMock = jest.fn();
  });

  it('renders', () => {
    const { getByTestId } = render(
      <Times
        preparationTime={preparationTime}
        cookTime={cookTime}
        setPreparationTime={setPreparationTimeMock}
        setCookTime={setCookTimeMock}
      />,
    );

    expect(getByTestId('Times')).toBeInTheDocument();
  });

  it('renders Prep and Cooking times', () => {
    const { getByText, getByDisplayValue } = render(
      <Times
        preparationTime={preparationTime}
        cookTime={cookTime}
        setPreparationTime={setPreparationTimeMock}
        setCookTime={setCookTimeMock}
      />,
    );

    expect(getByText('Prep (mins)')).toBeInTheDocument();
    expect(getByText('Cooking (mins)')).toBeInTheDocument();
    expect(getByDisplayValue(`${preparationTime}`)).toBeInTheDocument();
    expect(getByDisplayValue(`${cookTime}`)).toBeInTheDocument();
  });

  it('calls mocks when times are changed', () => {
    const { getByDisplayValue } = render(
      <Times
        preparationTime={preparationTime}
        cookTime={cookTime}
        setPreparationTime={setPreparationTimeMock}
        setCookTime={setCookTimeMock}
      />,
    );

    fireEvent.change(getByDisplayValue(`${preparationTime}`), {
      target: { value: 5 },
    });

    fireEvent.change(getByDisplayValue(`${cookTime}`), {
      target: { value: 20 },
    });

    expect(setPreparationTimeMock).toHaveBeenCalledWith(5);
    expect(setCookTimeMock).toHaveBeenCalledWith(20);
  });
});
