import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent, getByText } from '@testing-library/react';

import SideNav from '.';

describe('SideNav', () => {
  let tabs;
  let currentTab;

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
});
