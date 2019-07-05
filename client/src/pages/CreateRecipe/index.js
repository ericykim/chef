import React, { useState, Fragment } from 'react';
import { Card, PageHeader, Input, Button, Icon } from 'antd';
import cn from 'classnames';
import ordinal from 'ordinal-number-suffix';

import asPage from '../../hocs/asPage';
import styles from './styles.css';

/**
 * Create a new recipe page.
 */
const CreateRecipe = ({ className, history }) => {
  const [ingredients, setIngredients] = useState(['']);
  const [directions, setDirections] = useState(['']);

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
              placeholder={'Title'}
            />

            <Input className={styles.input} placeholder={'Subtitle'} />
          </div>
        }
        data-testid={'Recipe'}
      >
        <Input.TextArea
          rows={3}
          className={cn(styles.input, styles.description)}
          placeholder={'Description'}
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

        <Button className={styles.save} type={'primary'} block>
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

    setElements(elements.concat(''));
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
        onClick={() => setElements(elements.concat(''))}
        block
      >
        <Icon type={'plus-circle'} />
        {`Add ${placeholder}`}
      </Button>
    </div>
  );
};

export default asPage(CreateRecipe);
