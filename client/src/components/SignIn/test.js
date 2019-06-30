import React from 'react';
import { render, cleanup, fireEvent, wait } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { FetchMock } from '@react-mock/fetch';
import v4 from 'uuid/v4';

import SignIn from '.';

describe('SignIn', () => {
  afterEach(cleanup);

  it('renders', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>,
    );
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
          <BrowserRouter>
            <SignIn />
          </BrowserRouter>
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
          <BrowserRouter>
            <SignIn />
          </BrowserRouter>
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
          <BrowserRouter>
            <SignIn />
          </BrowserRouter>
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
