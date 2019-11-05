import React, { useContext } from 'react';
import cn from 'classnames';
import { PageHeader } from 'antd';

import api from '../../constants';
import { Button } from 'antd';
import ViewRecipe from '../../components/Recipe';
import UserContext from '../../contexts/UserContext';
import asPage from '../../hocs/asPage';
import styles from './styles.css';

/**
 * View recipe page.
 */
const Recipe = ({ className, match, history, setDocumentTitle }) => {
  const {
    params: { id },
  } = match;
  const { findRecipe } = useContext(UserContext);

  const recipe = findRecipe(id);

  return (
    recipe && (
      <div className={className} data-testid={'Recipe'}>
        <PageHeader
          onBack={() => history.push('/profile')}
          subTitle={'Back to recipes'}
        />

        <ViewRecipe recipe={recipe} history={history} />
      </div>
    )
  );
};

export default asPage(Recipe);
