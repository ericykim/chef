import React, { useState, useEffect, useContext } from 'react';
import { isEmpty, get } from 'lodash';
import wretch from 'wretch';
import { Card, PageHeader, Input, Button, Icon, message } from 'antd';
import cn from 'classnames';

import Times from './Times';
import UserContext from '../../contexts/UserContext';
import DynamicList from '../../components/DynamicList';
import api from '../../constants';
import asPage from '../../hocs/asPage';
import styles from './styles.css';

/**
 * Create a new recipe page.
 */
const CreateRecipe = ({ className, setDocumentTitle, match, history }) => {
  const {
    params: { id: recipeId },
  } = match;

  const {
    chef: { id },
    addRecipe,
    findRecipe,
    updateRecipe,
  } = useContext(UserContext);
  const recipe = findRecipe(recipeId);

  const [title, setTitle] = useState(get(recipe, 'title', null));
  const [subtitle, setSubtitle] = useState(get(recipe, 'subtitle', null));
  const [description, setDescription] = useState(
    get(recipe, 'description', null),
  );
  const [preparationTime, setPreparationTime] = useState(
    get(recipe, 'preparationTime', null),
  );
  const [cookTime, setCookTime] = useState(get(recipe, 'cookTime', null));
  const [ingredients, setIngredients] = useState(
    get(recipe, 'ingredients', [null]),
  );
  const [directions, setDirections] = useState(
    get(recipe, 'directions', [null]),
  );

  useEffect(() => {
    setDocumentTitle(title || '');
  }, [title]);

  const removeEmpty = (array) => array.filter((e) => !isEmpty(e));

  const save = () => {
    const newRecipe = {
      id: get(recipe, 'id', title),
      chef: id,
      title,
      subtitle,
      description,
      preparationTime,
      cookTime,
      pictures: get(recipe, 'pictures', []),
      ingredients: removeEmpty(ingredients),
      directions: removeEmpty(directions),
    };

    console.log(recipe);

    if (recipe) {
      updateRecipe(newRecipe);
    } else {
      addRecipe(newRecipe);
    }

    history.push('/profile');
  };

  return (
    <div className={cn(styles.page, className)} data-testid={'CreateRecipe'}>
      <PageHeader
        subTitle={'Back to recipes'}
        onBack={() => history.push('/profile')}
      />

      <Card
        title={
          <div className={styles.titles}>
            <Input
              className={cn(styles.input, styles.title)}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={'Title'}
            />

            <Input
              className={styles.input}
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder={'Subtitle'}
            />
          </div>
        }
        data-testid={'Recipe'}
      >
        <Input.TextArea
          className={cn(styles.input, styles.description)}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder={'Description'}
          autosize
        />

        <Times
          className={styles.times}
          preparationTime={preparationTime}
          cookTime={cookTime}
          setPreparationTime={setPreparationTime}
          setCookTime={setCookTime}
        />

        <DynamicList
          header={'Ingredients'}
          placeholder={'ingredient'}
          elements={ingredients}
          setElements={setIngredients}
        />

        <DynamicList
          header={'Directions'}
          placeholder={'direction'}
          elements={directions}
          setElements={setDirections}
        />

        <Button className={styles.save} type={'primary'} onClick={save} block>
          <Icon type={'form'} />
          Save recipe
        </Button>
      </Card>
    </div>
  );
};

export default asPage(CreateRecipe);
