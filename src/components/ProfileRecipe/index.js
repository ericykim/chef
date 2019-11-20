import React, { Fragment, useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import wretch from 'wretch';
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { Button, Card, Tag, Modal } from 'antd';

import UserContext from '../../contexts/UserContext';
import api from '../../constants';
import styles from './styles.css';

/**
 * Recipe card to be displayed on Profile pages.
 */
const ProfileRecipe = ({ className, recipe, remove, history }) => {
  const { id, title, subtitle, pictures, views, published } = recipe;
  const [openModal, setOpenModal] = useState(false);
  const { removeRecipe } = useContext(UserContext);

  const deleteRecipe = async () => {
    removeRecipe(id);
    setOpenModal(false);
  };

  return (
    <Fragment>
      <Modal
        visible={openModal}
        title={`Remove ${title}?`}
        onOk={deleteRecipe}
        onCancel={() => setOpenModal(false)}
        footer={[
          <Button key='back' onClick={deleteRecipe}>
            Remove
          </Button>,
          <Button key='submit' type='primary' onClick={() => setOpenModal(false)}>
            Cancel
          </Button>,
        ]}
      >
        <p>
          Are you sure you want to remove <b>{title}</b> from your recipes?
        </p>
      </Modal>
      <Card
        className={className}
        cover={
          !isEmpty(pictures) && (
            <Link to={`/recipe/${id}`}>
              <img src={pictures[0]} alt={title} />
            </Link>
          )
        }
        actions={[
          <Button type={'link'} icon='edit' onClick={() => history.push(`/recipe/new/${id}`)} />,
          <Button
            type={'link'}
            icon='delete'
            onClick={() => setOpenModal(true)}
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
    </Fragment>
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

export default withRouter(ProfileRecipe);
