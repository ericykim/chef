import React, { Fragment, useState, useEffect } from 'react';
import wretch from 'wretch';
import cn from 'classnames';
import { PageHeader } from 'antd';

import api from '../../constants';
import ViewRecipe from '../../components/Recipe';
import asPage from '../../hocs/asPage';
import styles from './styles.css';

import { findRecipe } from '../../content';

/**
 * View recipe page.
 */
const Recipe = ({ className, match, history, setDocumentTitle }) => {
  const {
    params: { id },
  } = match;

  const recipe = findRecipe(id);

  return (
    recipe && (
      <div className={className} data-testid={'Recipe'}>
        <PageHeader
          onBack={() => history.push('/profile')}
          subTitle={'Back to recipes'}
        />

        <ViewRecipe recipe={recipe} />
      </div>
    )
  );
};

export default asPage(Recipe);
