import React, { Fragment, useState } from 'react';

import { Layout, Button, Icon } from 'antd';
import cn from 'classnames';

import styles from './styles.css';

const Header = ({ className, onHamburger }) => {
  return (
    <Fragment>
      <Layout.Header
        className={cn(styles.header, className)}
        data-testid={'Header'}
      >
        <Button type="link" onClick={onHamburger} data-testid={'hamburger'}>
          <Icon style={{ color: 'black' }} type="menu" />
        </Button>
      </Layout.Header>
    </Fragment>
  );
};

export default Header;
