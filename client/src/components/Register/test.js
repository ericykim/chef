import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { FetchMock } from '@react-mock/fetch';
import v4 from 'uuid/v4';

import Register from '.';

describe('Register', () => {
  describe('successful registration', () => {});

  describe('failing registration', () => {
    const conflictMock = {
      matcher: 'http://localhost:3000/auth/register',
      method: 'POST',
      response: { status: 409, body: {} },
    };

    const errorMock = {
      matcher: 'http://localhost:3000/auth/register',
      method: 'POST',
      response: { status: 500, body: {} },
    };

    it('notifies user of missing fields', async () => {
      const { container, getByText } = render(
        <BrowserRouter>
          <Register />
        </BrowserRouter>,
      );
      fireEvent.click(container.querySelector('button[type="submit"]'));

      await wait(() => {
        expect(getByText('First name is required')).toBeInTheDocument();
        expect(getByText('Last name is required')).toBeInTheDocument();
        expect(getByText('Email address is required')).toBeInTheDocument();
        expect(getByText('Username is required')).toBeInTheDocument();
        expect(getByText('Password is required')).toBeInTheDocument();
        expect(getByText('Confirm your password')).toBeInTheDocument();
      });
    });

    it('prompts to enter valid email', async () => {
      const { getByPlaceholderText, getByText } = render(
        <BrowserRouter>
          <Register />
        </BrowserRouter>,
      );

      fireEvent.change(getByPlaceholderText('Email address'), {
        target: { value: 'gramsey' },
      });

      await wait(() => {
        expect(getByText('Invalid email address')).toBeInTheDocument();
      });
    });

    it('prompts to confirm password correctly', async () => {
      const { getByPlaceholderText, getByText } = render(
        <BrowserRouter>
          <Register />
        </BrowserRouter>,
      );

      fireEvent.change(getByPlaceholderText('Password'), {
        target: { value: 'secret sauce' },
      });

      fireEvent.change(getByPlaceholderText('Confirm Password'), {
        target: { value: 'is' },
      });

      await wait(() => {
        expect(getByText('Passwords do not match')).toBeInTheDocument();
      });
    });

    it('notifies user of account conflict', async () => {
      const { container, getByPlaceholderText, getByText } = render(
        <FetchMock {...conflictMock}>
          <BrowserRouter>
            <Register />
          </BrowserRouter>
        </FetchMock>,
      );

      fireEvent.change(getByPlaceholderText('First name'), {
        target: { value: 'Gordon' },
      });

      fireEvent.change(getByPlaceholderText('Last name'), {
        target: { value: 'Ramsey' },
      });

      fireEvent.change(getByPlaceholderText('Email address'), {
        target: { value: 'gramsey@hell.com' },
      });

      fireEvent.change(getByPlaceholderText('Username'), {
        target: { value: 'idiotsandwich' },
      });

      fireEvent.change(getByPlaceholderText('Password'), {
        target: { value: 'I am secretly weak' },
      });

      fireEvent.change(getByPlaceholderText('Confirm Password'), {
        target: { value: 'I am secretly weak' },
      });

      fireEvent.click(container.querySelector('button[type="submit"]'));

      await wait(() => {
        expect(getByText('Username or email is taken')).toBeInTheDocument();
      });
    });

    it('notifies user of unexpected error', async () => {
      const { container, getByPlaceholderText, getByText } = render(
        <FetchMock {...errorMock}>
          <BrowserRouter>
            <Register />
          </BrowserRouter>
        </FetchMock>,
      );

      fireEvent.change(getByPlaceholderText('First name'), {
        target: { value: 'Gordon' },
      });

      fireEvent.change(getByPlaceholderText('Last name'), {
        target: { value: 'Ramsey' },
      });

      fireEvent.change(getByPlaceholderText('Email address'), {
        target: { value: 'gramsey@hell.com' },
      });

      fireEvent.change(getByPlaceholderText('Username'), {
        target: { value: 'idiotsandwich' },
      });

      fireEvent.change(getByPlaceholderText('Password'), {
        target: { value: 'I am secretly weak' },
      });

      fireEvent.change(getByPlaceholderText('Confirm Password'), {
        target: { value: 'I am secretly weak' },
      });

      fireEvent.click(container.querySelector('button[type="submit"]'));

      await wait(() => {
        expect(getByText('Something went wrong')).toBeInTheDocument();
      });
    });
  });
});
