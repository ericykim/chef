import React from 'react';
import { render, cleanup, fireEvent, wait } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { FetchMock } from '@react-mock/fetch';
import UserContext from '../../contexts/UserContext';
import v4 from 'uuid/v4';

import SignIn from '.';

describe('SignIn', () => {
  let chef;
  let setUserMock;

  beforeEach(() => {
    chef = {
      id: v4(),
      username: v4(),
      firstName: 'Hello',
      lastName: 'World',
    };
    setUserMock = jest.fn();
  });

  afterEach(cleanup);

  it('renders', () => {
    const { getByTestId } = render(
      <UserContext.Provider value={[{}, setUserMock]}>
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      </UserContext.Provider>,
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
          response: { status: 200, body: chef },
        },
      ];

      wrapper = render(
        <FetchMock mocks={mocks}>
          <UserContext.Provider value={[{}, setUserMock]}>
            <BrowserRouter>
              <SignIn />
            </BrowserRouter>
          </UserContext.Provider>
        </FetchMock>,
      );
    });

    it('sets UserContext and redirects to home page', async () => {
      const { container, getByPlaceholderText } = wrapper;

      fireEvent.change(getByPlaceholderText('Username or email address'), {
        target: { value: 'wizz' },
      });

      fireEvent.change(getByPlaceholderText('Password'), {
        target: { value: 'waleefa' },
      });

      const submitButton = container.querySelector('button[type="submit"]');
      fireEvent.click(submitButton);

      await wait(() => {
        expect(setUserMock).toHaveBeenCalledWith(chef);
      });
    });
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
          <UserContext.Provider value={['', setUserMock]}>
            <BrowserRouter>
              <SignIn />
            </BrowserRouter>
          </UserContext.Provider>
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
          <UserContext.Provider value={['', setUserMock]}>
            <BrowserRouter>
              <SignIn />
            </BrowserRouter>
          </UserContext.Provider>
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
