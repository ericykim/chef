import React, { useState, Fragment } from 'react';
import { isEmpty } from 'lodash';
import { Card, Divider, Button } from 'antd';
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
    preparationTime,
    cookTime,
  } = recipe;

  const [picIndex, setPicIndex] = useState(0);
  const [recipeIndex, setRecipeIndex] = useState(0);

  const handleNextStep = () => {
    if (recipeIndex < directions.length - 1) {
      setRecipeIndex(recipeIndex + 1);
    }
  };

  const handlePreviousStep = () => {
    if (recipeIndex > 0) {
      setRecipeIndex(recipeIndex - 1);
    }
  };

  return (
    <Card
      title={<Title title={title} subtitle={subtitle} />}
      cover={!isEmpty(pictures) && <img src={pictures[picIndex]} alt={title} loading={'lazy'} />}
      data-testid={'Recipe'}
    >
      {!isEmpty(pictures) && (
        <Dots elements={pictures} selected={picIndex} onChange={setPicIndex} />
      )}

      <p>{description}</p>
      <Times preparationTime={preparationTime} cookTime={cookTime} />

      <List className={styles.list} header={'Ingredients'} elements={ingredients} />
      <List className={styles.list} header={'Directions'} elements={directions} ordered />

      <div>
        {directions[recipeIndex]}
        <div>
          <span>
            <Button type='primary' onClick={handlePreviousStep}>
              Back
            </Button>
            <Button type='primary' onClick={handleNextStep}>
              Next
            </Button>
          </span>
        </div>
      </div>
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

const Times = ({ preparationTime, cookTime }) => {
  return preparationTime || cookTime ? (
    <div className={styles.times}>
      {preparationTime && (
        <Fragment>
          <div>
            <h4>Prep</h4>
            <div>{preparationTime} mins</div>
          </div>
          <Divider className={styles.divider} type={'vertical'} />
        </Fragment>
      )}
      {cookTime && (
        <Fragment>
          <div>
            <h4>Cooking</h4>
            <div>{cookTime} mins</div>
          </div>
          <Divider className={styles.divider} type={'vertical'} />
        </Fragment>
      )}
      <div>
        <h4>Total</h4>
        <div>{cookTime + preparationTime} mins</div>
      </div>
    </div>
  ) : null;
};

const List = ({ className, header, elements, ordered }) => {
  const listedElements = elements.map((element, index) => <li key={index}>{element}</li>);

  return (
    <div className={className}>
      <h4> {header} </h4>
      {ordered ? <ol>{listedElements}</ol> : <ul>{listedElements}</ul>}
    </div>
  );
};

export default Recipe;
