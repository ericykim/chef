import React, { Fragment } from 'react';
import { Button, Icon } from 'antd';
import cn from 'classnames';

import styles from './styles.css';

/**
 * Dots for scrolling through carousel.
 */
const Dots = ({ className, elements, selected, onChange }) => {
  const leftDisable = selected === 0;
  const rightDisable = selected === elements.length - 1;

  return (
    <div className={cn(styles.container, className)} data-testid={'Dots'}>
      <Button
        size={'small'}
        type={'link'}
        icon={'caret-left'}
        disabled={leftDisable}
        onClick={() => onChange(selected - 1)}
        data-testid={'left'}
      />
      <div className={styles.dots}>
        {elements.map((_, index) => (
          <button
            key={index}
            className={cn(styles.dot, {
              [styles.selected]: index === selected,
            })}
            onClick={() => onChange(index)}
            data-testid={`dot-${index}`}
          />
        ))}
      </div>
      <Button
        size={'small'}
        type={'link'}
        icon={'caret-right'}
        onClick={() => onChange(selected + 1)}
        disabled={rightDisable}
        data-testid={'right'}
      />
    </div>
  );
};

export default Dots;
