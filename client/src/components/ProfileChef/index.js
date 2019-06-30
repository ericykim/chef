import React from 'react';
import { Avatar } from 'antd';
import cn from 'classnames';

import styles from './styles.css';

const ProfileChef = ({
  className,
  username,
  firstName,
  lastName,
  profilePicture,
}) => {
  return (
    <div className={cn(styles.chefCard, className)} data-testid={'ProfileChef'}>
      <Avatar
        className={styles.avatar}
        src={profilePicture}
        icon={'user'}
        size={80}
      />

      <div className={styles.chefInformation}>
        <div className={styles.name}>{`${firstName} ${lastName}`}</div>
        <div>{username}</div>
      </div>
    </div>
  );
};

export default ProfileChef;
