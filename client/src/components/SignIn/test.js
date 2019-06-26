import React from 'react';
import { render, cleanup, fireEvent, wait } from '@testing-library/react';
import { FetchMock } from '@react-mock/fetch';
import v4 from 'uuid/v4';

import SignIn from '.';

describe('SignIn', () => {
  afterEach(cleanup);

  it('renders', () => {
    const { getByTestId } = render(<SignIn />);
    expect(getByTestId('SignIn')).toBeInTheDocument();
  });

  describe('successful sign in', () => {
    let wrapper;

    beforeEach(() => {
      const mocks = [
        {
          matcher: 'http://localhost:3000/auth/login',
          method: 'POST',
          response: { status: 200, body: v4() },
        },
      ];

      wrapper = render(
        <FetchMock mocks={mocks}>
          <SignIn />,
        </FetchMock>,
      );
    });

    it('redirects to home page', () => {});
  });

  describe('failing sign in', () => {
    const unauthorizedMock = {
      matcher: 'http://localhost:3000/auth/login',
      method: 'POST',
      response: { status: 401, body: {} },
    };

    const errorMock = {
      matcher: 'http://localhost:3000/auth/login',
      method: 'POST',
      response: { status: 500, body: {} },
    };

    it('notifies user of wrong credentials', async () => {
      const { container, getByPlaceholderText, getByText } = render(
        <FetchMock {...unauthorizedMock}>
          <SignIn />,
        </FetchMock>,
      );

      fireEvent.change(getByPlaceholderText('Username or email address'), {
        target: { value: 'wizz' },
      });

      fireEvent.change(getByPlaceholderText('Password'), {
        target: { value: 'waleefa' },
      });

      fireEvent.click(container.querySelector('button[type="submit"]'));

      await wait(() => {
        expect(
          getByText('Incorrect username', { exact: false }),
        ).toBeInTheDocument();
      });
    });

    it('notifies user of unexpected error', async () => {
      const { container, getByPlaceholderText, getByText } = render(
        <FetchMock {...errorMock}>
          <SignIn />,
        </FetchMock>,
      );

      fireEvent.change(getByPlaceholderText('Username or email address'), {
        target: { value: 'wizz' },
      });

      fireEvent.change(getByPlaceholderText('Password'), {
        target: { value: 'waleefa' },
      });

      fireEvent.click(container.querySelector('button[type="submit"]'));

      await wait(() => {
        expect(
          getByText('Something went wrong', { exact: false }),
        ).toBeInTheDocument();
      });
    });
  });
});
