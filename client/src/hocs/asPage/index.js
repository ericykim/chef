import React from 'react';
import cn from 'classnames';

import styles from './styles.css';

/**
 * Higher order component for initializing pages.
 */
const asPage = ($component) => {
  return (props) => (
    <$component className={cn(props.className, styles.page)} {...props} />
  );
};

export default asPage;
