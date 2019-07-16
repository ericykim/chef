import React, { Fragment } from 'react';
import wretch from 'wretch';
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { Button, Card, Tag } from 'antd';

import api from '../../constants';
import styles from './styles.css';

/**
 * Recipe card to be displayed on Profile pages.
 */
const ProfileRecipe = ({ className, recipe, remove }) => {
  const { id, title, subtitle, pictures, views, published } = recipe;

  const deleteRecipe = async () => {
    await wretch(`${api.DELETE_RECIPE}/${recipe.id}`)
      .delete()
      .error(304, () => {})
      .res(({ status }) => {
        if (status === 200) {
          remove(recipe.id);
        }
      });
  };

  return (
    <Card
      className={className}
      cover={!isEmpty(pictures) && <img src={pictures[0]} alt={title} />}
      actions={[
        <Button type={'link'} icon="edit" />,
        <Button
          type={'link'}
          icon="delete"
          onClick={deleteRecipe}
          data-testid={'delete'}
        />,
      ]}
      hoverable
      data-testid={'ProfileRecipe'}
    >
      <Link to={`/recipe/${id}`}>
        <Card.Meta title={title} />
        <div className={styles.subtitle}>{subtitle}</div>
      </Link>
      <State published={published} views={views} />
    </Card>
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
