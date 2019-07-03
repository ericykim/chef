import React, { Fragment, useState, useEffect } from 'react';
import wretch from 'wretch';
import cn from 'classnames';
import { PageHeader, Card } from 'antd';

import api from '../../constants';
import ViewRecipe from '../../components/Recipe';
import asPage from '../../hocs/asPage';
import styles from './styles.css';

const Recipe = ({ className, match, history }) => {
  const {
    params: { id },
  } = match;

  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    wretch(`${api.GET_RECIPE}/${id}`)
      .get()
      .json(setRecipe);
  }, []);

  return (
    recipe && (
      <div className={className}>
        <PageHeader
          onBack={() => history.push('/profile/gvjacob')}
          subTitle={'Back to recipes'}
        />

        <ViewRecipe recipe={recipe} />
      </div>
    )
  );
};

export default asPage(Recipe);
