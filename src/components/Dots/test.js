import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';

import Dots from '.';

describe('Dots', () => {
  let elements;
  let selected;
  let onChangeMock;

  beforeEach(() => {
    elements = [1, 2, 3];
    selected = 0;
    onChangeMock = jest.fn();
  });

  afterEach(cleanup);

  it('renders', () => {
    const { getByTestId } = render(
      <Dots elements={elements} selected={selected} onChange={onChangeMock} />,
    );

    expect(getByTestId('Dots')).toBeInTheDocument();
  });

  it('renders as many dots', () => {
    const { getAllByTestId } = render(
      <Dots elements={elements} selected={selected} onChange={onChangeMock} />,
    );

    expect(getAllByTestId('dot-', { exact: false }).length).toBe(
      elements.length,
    );
  });

  it('calls onChange when clicking on a dot', () => {
    const { getByTestId } = render(
      <Dots elements={elements} selected={selected} onChange={onChangeMock} />,
    );
    fireEvent.click(getByTestId('dot-2'));

    expect(onChangeMock).toHaveBeenCalledWith(2);
  });

  it('enabled both buttons on middle dots', () => {
    const { getByTestId } = render(
      <Dots elements={elements} selected={1} onChange={onChangeMock} />,
    );

    const left = getByTestId('left');
    const right = getByTestId('right');

    expect(left).not.toHaveAttribute('disabled');
    expect(right).not.toHaveAttribute('disabled');
  });

  it('disables left button on first dot', () => {
    const { getByTestId } = render(
      <Dots elements={elements} selected={selected} onChange={onChangeMock} />,
    );

    const left = getByTestId('left');
    fireEvent.click(left);

    expect(left).toHaveAttribute('disabled');
    expect(onChangeMock).not.toHaveBeenCalled();
  });

  it('increments step on right', () => {
    const { getByTestId } = render(
      <Dots elements={elements} selected={selected} onChange={onChangeMock} />,
    );
    fireEvent.click(getByTestId('right'));

    expect(onChangeMock).toHaveBeenCalledWith(selected + 1);
  });

  it('decrements step on left', () => {
    const { getByTestId } = render(
      <Dots elements={elements} selected={1} onChange={onChangeMock} />,
    );

    fireEvent.click(getByTestId('left'));
    expect(onChangeMock).toHaveBeenCalledWith(0);
  });

  it('disables right button on last dot', () => {
    const { getByTestId } = render(
      <Dots elements={elements} selected={2} onChange={onChangeMock} />,
    );

    const right = getByTestId('right');
    fireEvent.click(right);

    expect(right).toHaveAttribute('disabled');
    expect(onChangeMock).not.toHaveBeenCalled();
  });
});
