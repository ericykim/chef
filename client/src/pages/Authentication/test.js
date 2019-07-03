import React from 'react';
import { render, cleanup, fireEvent, wait } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { FetchMock } from '@react-mock/fetch';
import v4 from 'uuid/v4';

import UserContext from '../../contexts/UserContext';
import Authentication from '.';

describe('Authentication', () => {
  afterEach(cleanup);

  describe('register', () => {
    it('renders Register component when mode is register', () => {
      const { getByTestId, getByText, queryByTestId } = render(
        <BrowserRouter>
          <UserContext.Provider value={['', () => {}]}>
            <Authentication mode={'Register'} />
          </UserContext.Provider>
        </BrowserRouter>,
      );

      expect(getByTestId('Register')).toBeInTheDocument();
      expect(
        getByText('Already have an account?', { exact: false }),
      ).toBeInTheDocument();
      expect(queryByTestId('SignIn')).toBeNull();
    });

    it('directs to login from register', async () => {
      const { getByTestId, container } = render(
        <BrowserRouter>
          <UserContext.Provider value={['', () => {}]}>
            <Authentication mode={'Register'} />
          </UserContext.Provider>
        </BrowserRouter>,
      );

      expect(getByTestId('Register')).toBeInTheDocument();
      expect(container.querySelector('a[href="/login"')).toBeInTheDocument();
    });
  });

  describe('login', () => {
    it('renders SignIn component when mode is login', () => {
      const { getByTestId, getByText, queryByTestId } = render(
        <BrowserRouter>
          <UserContext.Provider value={['', () => {}]}>
            <Authentication mode={'Login'} />
          </UserContext.Provider>
        </BrowserRouter>,
      );

      expect(getByTestId('SignIn')).toBeInTheDocument();
      expect(getByText('New to Chef', { exact: false })).toBeInTheDocument();
      expect(queryByTestId('Register')).toBeNull();
    });

    it('directs to register from login', async () => {
      const { getByTestId, container } = render(
        <BrowserRouter>
          <UserContext.Provider value={['', () => {}]}>
            <Authentication mode={'Login'} />
          </UserContext.Provider>
        </BrowserRouter>,
      );

      expect(getByTestId('SignIn')).toBeInTheDocument();
      expect(container.querySelector('a[href="/register"')).toBeInTheDocument();
    });
  });
});
