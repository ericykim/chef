import React, { useState, useEffect } from 'react';
import { isEmpty } from 'lodash';
import cn from 'classnames';
import { Carousel } from 'antd';
import wretch from 'wretch';

import ExploreRecipe from '../../components/ExploreRecipe';
import asPage from '../../hocs/asPage';

import api from '../../constants';
import styles from './styles.css';

/**
 * Explore recipes page
 */
const Explore = ({ className }) => {
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    wretch(api.GET_LABELED_RECIPES)
      .get()
      .json((labels) => {
        setLabels(labels);
      });
  }, []);

  return (
    !isEmpty(labels) && (
      <div className={cn(styles.page, className)} data-testid={'Explore'}>
        {labels.map(({ name, recipes }) => (
          <div>
            <div>{name}</div>
            <Carousel>
              {recipes.map((recipe) => (
                <ExploreRecipe recipe={recipe} />
              ))}
            </Carousel>
          </div>
        ))}
      </div>
    )
  );
};

export default asPage(Explore);
