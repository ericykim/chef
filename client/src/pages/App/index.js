import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { Switch, Route } from 'react-router-dom';
import cn from 'classnames';

import Profile from '../Profile';
import Recipe from '../Recipe';
import CreateRecipe from '../CreateRecipe';
import Header from '../../components/Header';
import SideNav from '../../components/SideNav';
import asPage from '../../hocs/asPage';
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

      <Layout className={cn(styles.content, { [styles.expanded]: !collapse })}>
        <Header onHamburger={() => setCollapse(!collapse)} />

        <Layout.Content>
          <Switch>
            <Route path={`/profile`} component={Profile} />
            <Route exact path={`/recipe/new`} component={CreateRecipe} />
            <Route path={`/recipe/:id`} component={Recipe} />
          </Switch>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default asPage(App);
