import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent, getByText } from '@testing-library/react';

import SideNav from '.';

describe('SideNav', () => {
  let tabs;
  let currentTab;
  let onDismissMock;

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
  });

  it('renders', () => {
    const { getByTestId } = render(
      <SideNav tabs={tabs} currentTab={currentTab} collapse={true} />,
    );
    expect(getByTestId('SideNav')).toBeInTheDocument();
  });

  it('renders tabs and correct links when collapse is false', () => {
    const { container, getByText } = render(
      <BrowserRouter>
        <SideNav tabs={tabs} currentTab={currentTab} collapse={false} />
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
        <SideNav tabs={tabs} currentTab={currentTab} collapse={true} />
      </BrowserRouter>,
    );

    tabs.forEach(({ text, to }) => {
      expect(queryByText(text)).toBeNull();
    });
  });

  it('defaults to given currentTab', () => {
    const { container } = render(
      <BrowserRouter>
        <SideNav tabs={tabs} currentTab={currentTab} collapse={false} />
      </BrowserRouter>,
    );

    const selected = container.querySelector('li.ant-menu-item-selected');
    expect(getByText(selected, currentTab)).toBeInTheDocument();
  });

  it('calls onDismiss when closed', () => {
    const { getByText } = render(
      <BrowserRouter>
        <SideNav
          tabs={tabs}
          currentTab={currentTab}
          collapse={false}
          onDismiss={onDismissMock}
        />
      </BrowserRouter>,
    );

    fireEvent.click(getByText('Close'));
    expect(onDismissMock).toHaveBeenCalled();
  });

  it('calls onDismiss and redirects to login when signing out', () => {
    const { container, getByText } = render(
      <BrowserRouter>
        <SideNav
          tabs={tabs}
          currentTab={currentTab}
          collapse={false}
          onDismiss={onDismissMock}
        />
      </BrowserRouter>,
    );

    fireEvent.click(getByText('Sign out'));
    expect(container.querySelector('a[href="/login"')).toBeInTheDocument();
    expect(onDismissMock).toHaveBeenCalled();
  });
});
