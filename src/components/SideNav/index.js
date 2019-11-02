import React, { useContext } from 'react';

import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import UserContext from '../../contexts/UserContext';
import styles from './styles.css';

const SideNav = ({
  className,
  tabs,
  currentTab,
  setCurrentTab,
  collapse,
  onDismiss,
}) => {
  const { setChef: setUser } = useContext(UserContext);

  const clickTab = (tab) => {
    onDismiss();
    setCurrentTab(tab);
  };

  const signOut = () => {
    onDismiss();
    setUser({});
  };

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
        <Menu.Item key="Close" onClick={onDismiss}>
          <Icon type="arrow-left" />
          Close
        </Menu.Item>

        {tabs.map(({ text, to, type }) => (
          <Menu.Item key={text}>
            <Link to={to} onClick={() => clickTab(text)}>
              {type && <Icon type={type} />}
              {text}
            </Link>
          </Menu.Item>
        ))}

        <Menu.Item className={styles.logout} key="Logout">
          <Link to={'/login'} onClick={signOut}>
            <Icon type="logout" />
            Sign out
          </Link>
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  );
};

export default SideNav;
