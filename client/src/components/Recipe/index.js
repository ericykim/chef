import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import { Card, Carousel, Button } from 'antd';
import cn from 'classnames';

import Dots from '../../components/Dots';
import styles from './styles.css';

/**
 * Recipe detail.
 */
const Recipe = ({ recipe }) => {
  const {
    title,
    subtitle,
    description,
    ingredients,
    directions,
    pictures,
  } = recipe;

  const [picIndex, setPicIndex] = useState(0);

  return (
    <Card
      title={<Title title={title} subtitle={subtitle} />}
      cover={!isEmpty(pictures) && <img src={pictures[picIndex]} alt={title} />}
      data-testid={'Recipe'}
    >
      {!isEmpty(pictures) && (
        <Dots elements={pictures} selected={picIndex} onChange={setPicIndex} />
      )}

      <p>{description}</p>
      <List
        className={styles.list}
        header={'Ingredients'}
        elements={ingredients}
      />
      <List
        className={styles.list}
        header={'Directions'}
        elements={directions}
      />
    </Card>
  );
};

const Title = ({ title, subtitle }) => {
  return (
    <div className={styles.titles}>
      <div className={styles.title}>{title}</div>
      <div className={styles.subtitle}>{subtitle}</div>
    </div>
  );
};

const List = ({ className, header, elements }) => {
  return (
    <div className={className}>
      <h3> {header} </h3>
      <ol>
        {elements.map((element, index) => (
          <li key={index}>{element}</li>
        ))}
      </ol>
    </div>
  );
};

export default Recipe;
