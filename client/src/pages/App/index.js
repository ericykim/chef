import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';

import Header from '../../components/Header';
import styles from './styles.css';

const App = () => {
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
      <Header tabs={tabs} currentTab={'Profile'} />
      <Layout.Content />
    </Layout>
  );
};

export default App;
