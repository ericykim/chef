import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import { render, fireEvent, getByText } from '@testing-library/react';

import SideNav from '.';

describe('SideNav', () => {
  let tabs;
  let currentTab;
  let onDismissMock;
  let setUserMock;

  beforeEach(() => {
    tabs = [
      {
        text: 'Home',
        to: '/register',
      },
      {
        text: 'Profile',
        to: '/login',
      },
    ];

    currentTab = tabs[1].text;
    onDismissMock = jest.fn();
    setUserMock = jest.fn();
  });

  it('renders', () => {
    const { getByTestId } = render(
      <UserContext.Provider value={[{}, setUserMock]}>
        <SideNav tabs={tabs} currentTab={currentTab} collapse={true} />
      </UserContext.Provider>,
    );
    expect(getByTestId('SideNav')).toBeInTheDocument();
  });

  it('renders tabs and correct links when collapse is false', () => {
    const { container, getByText } = render(
      <BrowserRouter>
        <UserContext.Provider value={[{}, setUserMock]}>
          <SideNav tabs={tabs} currentTab={currentTab} collapse={false} />
        </UserContext.Provider>
      </BrowserRouter>,
    );

    tabs.forEach(({ text, to }) => {
      expect(getByText(text)).toBeInTheDocument();
      expect(container.querySelector(`a[href="${to}"]`)).toBeInTheDocument();
    });
  });

  it('hides tabs when collapse is true', () => {
    const { queryByText } = render(
      <BrowserRouter>
        <UserContext.Provider value={[{}, setUserMock]}>
          <SideNav tabs={tabs} currentTab={currentTab} collapse={true} />
        </UserContext.Provider>
      </BrowserRouter>,
    );

    tabs.forEach(({ text, to }) => {
      expect(queryByText(text)).toBeNull();
    });
  });

  it('defaults to given currentTab', () => {
    const { container } = render(
      <BrowserRouter>
        <UserContext.Provider value={[{}, setUserMock]}>
          <SideNav tabs={tabs} currentTab={currentTab} collapse={false} />
        </UserContext.Provider>
      </BrowserRouter>,
    );

    const selected = container.querySelector('li.ant-menu-item-selected');
    expect(getByText(selected, currentTab)).toBeInTheDocument();
  });

  it('calls onDismiss when closed', () => {
    const { getByText } = render(
      <BrowserRouter>
        <UserContext.Provider value={[{}, setUserMock]}>
          <SideNav
            tabs={tabs}
            currentTab={currentTab}
            collapse={false}
            onDismiss={onDismissMock}
          />
        </UserContext.Provider>
      </BrowserRouter>,
    );

    fireEvent.click(getByText('Close'));
    expect(onDismissMock).toHaveBeenCalled();
  });

  it('calls onDismiss, resets user, and redirects to login when signing out', () => {
    const { container, getByText } = render(
      <BrowserRouter>
        <UserContext.Provider value={[{}, setUserMock]}>
          <SideNav
            tabs={tabs}
            currentTab={currentTab}
            collapse={false}
            onDismiss={onDismissMock}
          />
        </UserContext.Provider>
      </BrowserRouter>,
    );

    fireEvent.click(getByText('Sign out'));
    expect(container.querySelector('a[href="/login"')).toBeInTheDocument();
    expect(onDismissMock).toHaveBeenCalled();
    expect(setUserMock).toHaveBeenCalledWith({});
  });
});
