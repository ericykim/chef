import React from 'react';
import { InputNumber, Divider } from 'antd';
import cn from 'classnames';

import styles from './styles.css';

const Times = ({
  className,
  preparationTime,
  setPreparationTime,
  cookTime,
  setCookTime,
}) => {
  return (
    <div className={cn(styles.times, className)} data-testid={'Times'}>
      <div>
        <h4>Prep (mins)</h4>
        <InputNumber
          value={preparationTime}
          onChange={(value) => setPreparationTime(value)}
          min={0}
        />
      </div>
      <Divider className={styles.divider} type={'vertical'} />
      <div>
        <h4>Cooking (mins)</h4>
        <InputNumber
          value={cookTime}
          onChange={(value) => setCookTime(value)}
          min={0}
        />
      </div>
    </div>
  );
};

export default Times;
