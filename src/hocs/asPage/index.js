import React, { useEffect, useContext } from 'react';
import { isEmpty } from 'lodash';
import { withRouter } from 'react-router-dom';
import cn from 'classnames';

import UserContext from '../../contexts/UserContext';
import styles from './styles.css';

/**
 * Higher order component for initializing pages with fade in and initial scroll,
 * providing API for setting document title, and automatic redirects
 * when user is not logged in.
 *
 * asPage will revert document title when component is unmounted.
 *
 * @param {*} $component component to render
 * @param {*} redirect if user is not logged in, redirect to?
 */
const asPage = ($component, redirect = '/login') =>
  withRouter((props) => {
    const documentTitle = 'Chef';
    const { chef: user } = useContext(UserContext);

    useEffect(() => {
      if (redirect && isEmpty(user)) {
        props.history.push(redirect);
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
