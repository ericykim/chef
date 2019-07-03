import React from 'react';
import cn from 'classnames';

import styles from './styles.css';

/**
 * Dots for scrolling through array.
 */
const Dots = ({ className, elements, selected, onChange }) => {
  return (
    <div className={cn(styles.dots, className)} data-testid={'Dots'}>
      {elements.map((_, index) => (
        <button
          key={index}
          className={cn(styles.dot, { [styles.selected]: index === selected })}
          onClick={() => onChange(index)}
          data-testid={`dot-${index}`}
        />
      ))}
    </div>
  );
};

export default Dots;
