import React, { useEffect, useContext } from 'react';
import { isEmpty } from 'lodash';
import { withRouter } from 'react-router-dom';
import cn from 'classnames';

import UserContext from '../../contexts/UserContext';
import styles from './styles.css';

/**
 * Higher order component for initializing pages with fade in,
 * providing API for setting document title.
 *
 * asPage will revert document title when component is unmounted.
 */
const asPage = ($component) =>
  withRouter((props) => {
    const documentTitle = 'Chef';
    const [user] = useContext(UserContext);

    useEffect(() => {
      if (isEmpty(user)) {
        props.history.push('/login');
      }

      return () => (document.title = documentTitle);
    }, []);

    const setDocumentTitle = (title) =>
      (document.title = `${documentTitle} | ${title}`);

    return (
      <$component
        className={cn(props.className, styles.page)}
        setDocumentTitle={setDocumentTitle}
        {...props}
        match={props.testMatch || props.match}
      />
    );
  });

export default asPage;
