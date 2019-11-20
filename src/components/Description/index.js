import React, { Fragment, useState } from 'react';
import cn from 'classnames';

import styles from './styles.css';

const Description = ({ className }) => {
  return (
    <Fragment>
        <h1 className={styles.title}>Chef</h1>
        <div className={cn(className, styles.description)}>
            Where you can write, follow, explore, and collaborate on recipes!
        </div>
    </Fragment>
  );
};

export default Description;