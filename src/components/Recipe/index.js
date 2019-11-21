import React, { useState, Fragment } from 'react';
import { isEmpty } from 'lodash';
import { Card, Divider, Button } from 'antd';
import cn from 'classnames';

import Dots from '../../components/Dots';
import styles from './styles.css';

/**
 * Recipe detail.
 */
const Recipe = ({ recipe, history }) => {
  const {
    id,
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

  return (
    <Card
      title={<Title title={title} subtitle={subtitle} />}
      cover={
        !isEmpty(pictures) && (
          <img src={pictures[picIndex]} alt={title} loading={'lazy'} />
        )
      }
      data-testid={'Recipe'}
    >
      {!isEmpty(pictures) && (
        <Dots elements={pictures} selected={picIndex} onChange={setPicIndex} />
      )}

      <p>{description}</p>
      <Times preparationTime={preparationTime} cookTime={cookTime} />

      {!isEmpty(ingredients) && (
        <List
          className={styles.list}
          header={'Ingredients'}
          elements={ingredients}
        />
      )}

      {!isEmpty(directions) && (
        <List
          className={styles.list}
          header={'Directions'}
          elements={directions}
          ordered
        />
      )}
      <div className={styles.ctas}>
        <Button
          className={styles.followRecipe}
          type="primary"
          onClick={() => history.push(`/walkthrough/${id}`)}
          disabled={isEmpty(ingredients) || isEmpty(directions)}
        >
          Cook Recipe!
        </Button>
        <Button
          className={styles.followRecipe}
          type="primary"
          onClick={() => history.push(`/recipe/new/${id}`)}
        >
          Edit Recipe
        </Button>
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
  const listedElements = elements.map((element, index) => (
    <li key={index}>{element}</li>
  ));

  return (
    <div className={className}>
      <h4> {header} </h4>
      {ordered ? (
        <ol className={styles.listItem}>{listedElements}</ol>
      ) : (
        <ul className={styles.listItem}>{listedElements}</ul>
      )}
    </div>
  );
};

export default Recipe;
