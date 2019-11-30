import React from 'react';
import { Input, Button, Icon } from 'antd';
import cn from 'classnames';
import ordinal from 'ordinal-number-suffix';

import styles from './styles.css';

/**
 * DynamicList list with adjustable length.
 */
const DynamicList = ({
  className,
  header,
  placeholder,
  elements,
  setElements,
}) => {
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
    <div className={cn(className)} data-testid={'DynamicList'}>
      <h4>{header}</h4>
      {elements.map((element, index) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Input.TextArea
            key={index}
            value={element}
            onChange={updateAtFunc(index)}
            onPressEnter={onEnter(index)}
            className={styles.input}
            defaultValue={element}
            placeholder={`${placeholder}` == 'picture' ? 
              "Link for " + `${ordinal(index + 1)} ${placeholder}` : 
                `${ordinal(index + 1)} ${placeholder}`}
            rows={3}
            style={{ maxWidth: '95%', resize: 'none'}}
            autosize
          />
          <Button
            className={styles.remove}
            icon={'close'}
            type={'link'}
            style={{ color: 'rgba(0,0,0,.45)' }}
            onHover={{ cursor: 'pointer'}}
            onClick={removeAtFunc(index)}
          />
        </div>
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

export default DynamicList;
