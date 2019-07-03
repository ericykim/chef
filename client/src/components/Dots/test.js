import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Dots from '.';

describe('Dots', () => {
  let wrapper;
  let elements;
  let selected;
  let onChangeMock;

  beforeEach(() => {
    elements = [1, 2, 3];
    selected = 0;
    onChangeMock = jest.fn();

    wrapper = render(
      <Dots elements={elements} selected={selected} onChange={onChangeMock} />,
    );
  });

  it('renders', () => {
    const { getByTestId } = wrapper;
    expect(getByTestId('Dots')).toBeInTheDocument();
  });

  it('renders as many dots', () => {
    const { getAllByTestId } = wrapper;

    expect(getAllByTestId('dot-', { exact: false }).length).toBe(
      elements.length,
    );
  });

  it('calls onChange when clicking on a dot', () => {
    const { getByTestId } = wrapper;
    fireEvent.click(getByTestId('dot-2'));

    expect(onChangeMock).toHaveBeenCalledWith(2);
  });
});
