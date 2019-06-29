import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent, getByText } from '@testing-library/react';

import Header from '.';

describe('Header', () => {
  let wrapper;
  let onHamburgerMock;

  beforeEach(() => {
    onHamburgerMock = jest.fn();
    wrapper = render(<Header onHamburger={onHamburgerMock} />);
  });

  it('renders', () => {
    const { getByTestId } = wrapper;
    expect(getByTestId('Header')).toBeInTheDocument();
  });

  it('calls onHamburger when hamburger is clicked', () => {
    const { getByTestId } = wrapper;
    expect(getByTestId('hamburger')).toBeInTheDocument();

    fireEvent.click(getByTestId('hamburger'));
    expect(onHamburgerMock).toHaveBeenCalled();
  });
});
