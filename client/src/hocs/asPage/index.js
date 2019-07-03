import React, { useEffect } from 'react';
import cn from 'classnames';

import styles from './styles.css';

/**
 * Higher order component for initializing pages with fade in,
 * providing API for setting document title.
 *
 * asPage will revert document title when component is unmounted.
 */
const asPage = ($component) => (props) => {
  const documentTitle = 'Chef';

  useEffect(() => {
    return () => (document.title = documentTitle);
  }, []);

  const setDocumentTitle = (title) =>
    (document.title = `${documentTitle} | ${title}`);

  return (
    <$component
      className={cn(props.className, styles.page)}
      setDocumentTitle={setDocumentTitle}
      {...props}
    />
  );
};

export default asPage;
