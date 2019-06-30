import React from 'react';

import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import styles from './styles.css';

const SideNav = ({ className, tabs, currentTab, collapse }) => {
  return (
    <Layout.Sider
      className={cn(styles.sider, className)}
      collapsedWidth={0}
      collapsed={collapse}
      data-testid={'SideNav'}
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

export default SideNav;
