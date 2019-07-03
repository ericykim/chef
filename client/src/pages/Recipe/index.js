import React, { Fragment, useState, useEffect } from 'react';
import wretch from 'wretch';
import { PageHeader, Card } from 'antd';

import api from '../../constants';
import ViewRecipe from '../../components/Recipe';
import styles from './styles.css';

const Recipe = ({ match, history }) => {
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
      <Fragment>
        <PageHeader
          onBack={() => history.push('/profile/gvjacob')}
          subTitle={'Back to recipes'}
        />

        <ViewRecipe recipe={recipe} />
      </Fragment>
    )
  );
};

export default Recipe;
