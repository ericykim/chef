import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { Card, Tag } from 'antd';

import styles from './styles.css';

/**
 * Recipe card to be displayed on Profile pages.
 */
const ProfileRecipe = ({ className, recipe }) => {
  const { id, title, subtitle, pictures, views, published } = recipe;

  return (
    <Link to={`/recipe/${id}`}>
      <Card
        className={className}
        cover={!isEmpty(pictures) && <img src={pictures[0]} alt={title} />}
        hoverable
        data-testid={'ProfileRecipe'}
      >
        <Card.Meta title={title} />
        <div className={styles.subtitle}>{subtitle}</div>
        <State published={published} views={views} />
      </Card>
    </Link>
  );
};

const State = ({ published, views }) => {
  const color = published ? '#87d068' : '#8c8c8c';
  const text = published ? 'Published' : 'Draft';

  return (
    <Fragment>
      <Tag color={color}>{text}</Tag>
      {published && <Tag color={'orange'}>{views} Views</Tag>}
    </Fragment>
  );
};

export default ProfileRecipe;
