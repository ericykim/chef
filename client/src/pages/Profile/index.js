import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import wretch from 'wretch';
import { Empty, Button } from 'antd';

import ProfileChef from '../../components/ProfileChef';
import ProfileRecipe from '../../components/ProfileRecipe';
import Recipes from '../../components/Recipes';

import api from '../../constants';
import styles from './styles.css';

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

  const createRecipeCta = (
    <Button type={'primary'} icon={'form'}>
      Create a recipe
    </Button>
  );

  return (
    chef && (
      <div className={styles.page} data-testid={'Profile'}>
        <ProfileChef className={styles.profileChef} {...chef} />
        {isEmpty(chef.recipes) ? (
          <Empty description={createRecipeCta} data-testid={'Empty'} />
        ) : (
          <Recipes recipes={chef.recipes} $component={ProfileRecipe} />
        )}
      </div>
    )
  );
};

export default Profile;
