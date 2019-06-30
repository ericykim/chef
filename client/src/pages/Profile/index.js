import React, { useEffect, useState } from 'react';
import wretch from 'wretch';
import { Avatar } from 'antd';

import api from '../../constants';
import styles from './styles.css';
import ProfileChef from '../../components/ProfileChef';
import ProfileRecipe from '../../components/ProfileRecipe';

/**
 * Chef profile page
 */
const Profile = ({ match }) => {
  const { username } = match.params;
  const [chef, setChef] = useState(null);

  useEffect(() => {
    wretch(`${api.GET_CHEF_PROFILE}/${username}`)
      .get()
      .json((chef) => setChef(chef));
  }, []);

  return (
    chef && (
      <div className={styles.page}>
        <ProfileChef className={styles.profileChef} {...chef} />

        {chef.recipes.map((recipe) => (
          <ProfileRecipe
            className={styles.profileRecipe}
            key={recipe.id}
            recipe={recipe}
          />
        ))}
      </div>
    )
  );
};

export default Profile;
