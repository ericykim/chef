import React from 'react';
import { isEmpty } from 'lodash';
import { Card, Button } from 'antd';

import styles from './styles.css';

const ExploreRecipe = ({ className, recipe }) => {
  const { title, pictures, subtitle } = recipe;

  return (
    <Card
      className={className}
      cover={!isEmpty(pictures) && <img src={pictures[0]} alt={title} />}
      hoverable
      data-testid={'ExploreRecipe'}
    >
      <Card.Meta title={title} />
      <div className={styles.subtitle}>{subtitle}</div>
    </Card>
  );
};

export default ExploreRecipe;
