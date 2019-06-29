import React, { Fragment, useState } from 'react';

import { Layout, Menu, Button, Icon } from 'antd';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import styles from './styles.css';

const Sider = ({ className, tabs, currentTab, collapse }) => {
  return (
    <Layout.Sider
      className={styles.sider}
      collapsedWidth={0}
      collapsed={collapse}
    >
      <Menu
        className={styles.menu}
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[currentTab]}
      >
        {tabs.map(({ text, to }) => (
          <Menu.Item key={text}>
            <Link to={to}>{text}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Layout.Sider>
  );
};

const Header = ({ className, tabs, currentTab }) => {
  const [collapse, setCollapse] = useState(true);

  return (
    <Fragment>
      <Sider tabs={tabs} currentTab={currentTab} collapse={collapse} />
      <Layout.Header
        className={cn(styles.header, className)}
        data-testid={'Header'}
      >
        <Button
          type="link"
          onClick={() => setCollapse(!collapse)}
          data-testid={'hamburger'}
        >
          <Icon style={{ color: 'black' }} type="menu" />
        </Button>
      </Layout.Header>
    </Fragment>
  );
};

export default Header;
