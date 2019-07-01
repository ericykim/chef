import React, { Fragment, useState, useEffect } from 'react';
import wretch from 'wretch';
import { Card } from 'antd';

import api from '../../constants';
import styles from './styles.css';

const ViewRecipe = ({ match }) => {
  const { params } = match;
  const { id } = params;

  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    wretch(`${api.GET_RECIPE}/${id}`)
      .get()
      .json(setRecipe);
  }, []);

  return (
    recipe && (
      <Card title={recipe.title} data-testid={'ViewRecipe'}>
        <List header={'Ingredients'} elements={recipe.ingredients} />
        <List header={'Directions'} elements={recipe.directions} />
      </Card>
    )
  );
};

const List = ({ header, elements }) => {
  return (
    <Fragment>
      <h3> {header} </h3>
      {elements.map((element, index) => (
        <div>
          {index + 1}. {element}
        </div>
      ))}
    </Fragment>
  );
};

export default ViewRecipe;
