import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { FetchMock } from '@react-mock/fetch';
import { render, wait, cleanup, fireEvent } from '@testing-library/react';
import UserContext from '../../contexts/UserContext';

import Profile from '.';

describe('Profile', () => {
  let wrapper;
  let mocks;
  let username;
  let chef;

  beforeEach(() => {
    username = 'gramsey';

    chef = {
      username,
      firstName: 'Gordon',
      lastName: 'Ramsey',
      recipes: [
        { title: 'one', base: null },
        { title: 'two', base: { title: 'three' } },
      ],
      bio: 'imma celeb chef',
    };

    mocks = [
      {
        matcher: `http://localhost:3000/chef/${username}`,
        method: 'GET',
        response: { status: 200, body: chef },
      },
    ];
  });

  it('renders', async () => {
    const { getByTestId } = render(
      <FetchMock mocks={mocks}>
        <BrowserRouter>
          <UserContext.Provider value={[chef.username, () => {}]}>
            <Profile match={{ params: { username } }} />
          </UserContext.Provider>
        </BrowserRouter>
      </FetchMock>,
    );

    await wait(() => {
      expect(getByTestId('Profile')).toBeInTheDocument();
    });
  });

  it('renders ProfileChef', async () => {
    const { getByTestId } = render(
      <FetchMock mocks={mocks}>
        <BrowserRouter>
          <UserContext.Provider value={[chef.username, () => {}]}>
            <Profile match={{ params: { username } }} />
          </UserContext.Provider>
        </BrowserRouter>
      </FetchMock>,
    );

    await wait(() => {
      expect(getByTestId('ProfileChef')).toBeInTheDocument();
    });
  });

  it('renders Empty if recipes is empty', async () => {
    chef.recipes = [];

    const { getByText, getByTestId } = render(
      <FetchMock mocks={mocks}>
        <BrowserRouter>
          <UserContext.Provider value={[chef.username, () => {}]}>
            <Profile match={{ params: { username } }} />
          </UserContext.Provider>
        </BrowserRouter>
      </FetchMock>,
    );

    await wait(() => {
      expect(getByTestId('Empty')).toBeInTheDocument();
      expect(getByText('Create a recipe')).toBeInTheDocument();
    });
  });

  it('renders tabs', async () => {
    const { getByText } = render(
      <FetchMock mocks={mocks}>
        <BrowserRouter>
          <UserContext.Provider value={[chef.username, () => {}]}>
            <Profile match={{ params: { username } }} />
          </UserContext.Provider>
        </BrowserRouter>
      </FetchMock>,
    );

    await wait(() => {
      expect(getByText('My Recipes')).toBeInTheDocument();
      expect(getByText('Forked')).toBeInTheDocument();
    });
  });

  it('renders tabs', async () => {
    const { getByText } = render(
      <FetchMock mocks={mocks}>
        <BrowserRouter>
          <UserContext.Provider value={[chef.username, () => {}]}>
            <Profile match={{ params: { username } }} />
          </UserContext.Provider>
        </BrowserRouter>
      </FetchMock>,
    );

    await wait(() => {
      expect(getByText('My Recipes')).toBeInTheDocument();
      expect(getByText('Forked')).toBeInTheDocument();
    });
  });

  it('renders My Recipes initially', async () => {
    const { getByText, queryByText } = render(
      <FetchMock mocks={mocks}>
        <BrowserRouter>
          <UserContext.Provider value={[chef.username, () => {}]}>
            <Profile match={{ params: { username } }} />
          </UserContext.Provider>
        </BrowserRouter>
      </FetchMock>,
    );

    await wait(() => {
      expect(getByText('My Recipes')).toBeInTheDocument();
      expect(getByText('one')).toBeInTheDocument();
      expect(queryByText('two')).toBeNull();
    });
  });

  it('renders Forked recipes after clicking on Forked tab', async () => {
    const { getByText } = render(
      <FetchMock mocks={mocks}>
        <BrowserRouter>
          <UserContext.Provider value={[chef.username, () => {}]}>
            <Profile match={{ params: { username } }} />
          </UserContext.Provider>
        </BrowserRouter>
      </FetchMock>,
    );

    await wait(() => {
      fireEvent.click(getByText('Forked'));

      expect(getByText('Forked')).toBeInTheDocument();
      expect(getByText('two')).toBeInTheDocument();
    });
  });

  it('renders Create a recipe cta for My Recipes', async () => {
    const { getByText } = render(
      <FetchMock mocks={mocks}>
        <BrowserRouter>
          <UserContext.Provider value={[chef.username, () => {}]}>
            <Profile match={{ params: { username } }} />
          </UserContext.Provider>
        </BrowserRouter>
      </FetchMock>,
    );

    await wait(() => {
      expect(getByText('Create a recipe')).toBeInTheDocument();
    });
  });

  it('renders Fork a recipe cta for Forked', async () => {
    const { getByText } = render(
      <FetchMock mocks={mocks}>
        <BrowserRouter>
          <UserContext.Provider value={[chef.username, () => {}]}>
            <Profile match={{ params: { username } }} />
          </UserContext.Provider>
        </BrowserRouter>
      </FetchMock>,
    );

    await wait(() => {
      fireEvent.click(getByText('Forked'));

      expect(getByText('Fork a recipe')).toBeInTheDocument();
    });
  });
});
