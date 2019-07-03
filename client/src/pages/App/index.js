import React, { useState } from 'react';
import { Layout } from 'antd';
import { Route } from 'react-router-dom';

import Profile from '../Profile';
import Recipe from '../Recipe';
import Header from '../../components/Header';
import SideNav from '../../components/SideNav';
import styles from './styles.css';

const App = ({ match }) => {
  const [collapse, setCollapse] = useState(true);

  const tabs = [
    {
      text: 'Profile',
      to: '/profile',
      type: 'user',
    },
  ];

  return (
    <Layout className={styles.page}>
      <SideNav
        tabs={tabs}
        currentTab={'Profile'}
        collapse={collapse}
        onDismiss={() => setCollapse(true)}
      />

      <Layout>
        <Header onHamburger={() => setCollapse(!collapse)} />
        <Layout.Content>
          <Route path={`/profile`} component={Profile} />
          <Route path={`/recipe/:id`} component={Recipe} />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default App;
