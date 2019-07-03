import React from 'react';

import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import styles from './styles.css';

const SideNav = ({ className, tabs, currentTab, collapse, setCollapse }) => {
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
        <Menu.Item key="Close" onClick={() => setCollapse(true)}>
          <Icon type="arrow-left" />
          <span>Close</span>
        </Menu.Item>

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
