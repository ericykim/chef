import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent, getByText } from '@testing-library/react';

import Header from '.';

describe('Header', () => {
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
      <Header tabs={tabs} currentTab={currentTab} />,
    );
    expect(getByTestId('Header')).toBeInTheDocument();
  });

  it('renders tabs and correct links when hamburger is clicked', () => {
    const { container, getByText, getByTestId } = render(
      <BrowserRouter>
        <Header tabs={tabs} currentTab={currentTab} />
      </BrowserRouter>,
    );
    fireEvent.click(getByTestId('hamburger'));

    tabs.forEach(({ text, to }) => {
      expect(getByText(text)).toBeInTheDocument();
      expect(container.querySelector(`a[href="${to}"]`)).toBeInTheDocument();
    });
  });

  it('closes sider when hamburger is clicked second time', () => {
    const { queryByText, getByText, getByTestId } = render(
      <BrowserRouter>
        <Header tabs={tabs} currentTab={currentTab} />
      </BrowserRouter>,
    );

    fireEvent.click(getByTestId('hamburger'));
    tabs.forEach(({ text }) => expect(getByText(text)).toBeInTheDocument());

    fireEvent.click(getByTestId('hamburger'));
    tabs.forEach(({ text }) => expect(queryByText(text)).toBeNull());
  });

  it('defaults to given currentTab', () => {
    const { getByTestId, container } = render(
      <BrowserRouter>
        <Header tabs={tabs} currentTab={currentTab} />
      </BrowserRouter>,
    );

    fireEvent.click(getByTestId('hamburger'));
    const selected = container.querySelector('li.ant-menu-item-selected');

    expect(getByText(selected, currentTab)).toBeInTheDocument();
  });
});
