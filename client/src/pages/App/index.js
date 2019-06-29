import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from '../../components/Header';
import Profile from '../Profile';
import styles from './styles.css';
import SideNav from '../../components/SideNav';

const App = ({ match }) => {
  const [collapse, setCollapse] = useState(true);

  const tabs = [
    {
      text: 'Home',
      to: '/register',
    },
    {
      text: 'Profile',
      to: '/login',
    },
  ];

  return (
    <Layout className={styles.page}>
      <SideNav tabs={tabs} currentTab={'Profile'} collapse={collapse} />
      <Layout>
        <Header onHamburger={() => setCollapse(!collapse)} />
        <Layout.Content>
          <Route path={`/profile/:username`} component={Profile} />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default App;
