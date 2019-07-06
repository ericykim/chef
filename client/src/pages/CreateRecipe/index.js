import React, { useState, useContext } from 'react';
import { isEmpty } from 'lodash';
import wretch from 'wretch';
import { Card, PageHeader, Input, Button, Icon } from 'antd';
import cn from 'classnames';
import ordinal from 'ordinal-number-suffix';

import UserContext from '../../contexts/UserContext';
import api from '../../constants';
import asPage from '../../hocs/asPage';
import styles from './styles.css';

/**
 * Create a new recipe page.
 */
const CreateRecipe = ({ className, history }) => {
  const [{ id }] = useContext(UserContext);

  const [title, setTitle] = useState(null);
  const [subtitle, setSubtitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [ingredients, setIngredients] = useState([null]);
  const [directions, setDirections] = useState([null]);

  const removeEmpty = (array) => array.filter((e) => !isEmpty(e));

  const save = () => {
    wretch(api.CREATE_RECIPE).post({
      chef: id,
      title,
      subtitle,
      description,
      ingredients: removeEmpty(ingredients),
      directions: removeEmpty(directions),
    });
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

/**
 * Dynamic list with adjustable length.
 */
const DynamicList = ({ header, placeholder, elements, setElements }) => {
  const getNextInput = (curIndex) => {
    return document.querySelector(
      `input[placeholder="${ordinal(curIndex + 2)} ${placeholder}"]`,
    );
  };

  const updateAtFunc = (index) => (e) => {
    setElements(
      elements.map((element, idx) =>
        idx === index ? e.target.value : element,
      ),
    );
  };

  const removeAtFunc = (index) => () => {
    setElements(elements.filter((_, idx) => index !== idx));
  };

  const onEnter = (curIndex) => () => {
    const nextInput = getNextInput(curIndex);

    if (nextInput) {
      return nextInput.focus();
    }

    setElements(elements.concat(null));
    setTimeout(() => getNextInput(curIndex).focus(), 20);
  };

  return (
    <div className={styles.dynamicList}>
      <h3>{header}</h3>
      {elements.map((element, index) => (
        <Input
          key={index}
          value={element}
          onChange={updateAtFunc(index)}
          onPressEnter={onEnter(index)}
          className={styles.input}
          defaultValue={element}
          placeholder={`${ordinal(index + 1)} ${placeholder}`}
          suffix={
            index > 0 && (
              <Button
                className={styles.remove}
                icon={'close'}
                type={'link'}
                style={{ color: 'rgba(0,0,0,.45)' }}
                onClick={removeAtFunc(index)}
              />
            )
          }
        />
      ))}
      <Button
        className={styles.addButton}
        type={'dashed'}
        onClick={() => setElements(elements.concat(null))}
        block
      >
        <Icon type={'plus-circle'} />
        {`Add ${placeholder}`}
      </Button>
    </div>
  );
};

export default asPage(CreateRecipe);
