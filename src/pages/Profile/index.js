import React, { useEffect, useState, useContext } from 'react';
import { isEmpty } from 'lodash';
import { Link } from 'react-router-dom';
import wretch from 'wretch';
import cn from 'classnames';
import { Empty, Button, Tabs, Icon } from 'antd';

import ProfileChef from '../../components/ProfileChef';
import ProfileRecipe from '../../components/ProfileRecipe';
import Recipes from '../../components/Recipes';
import UserContext from '../../contexts/UserContext';
import asPage from '../../hocs/asPage';

import api from '../../constants';
import styles from './styles.css';

/**
 * Chef profile page
 */
const Profile = ({ className, setDocumentTitle }) => {
  const { chef } = useContext(UserContext);

  useEffect(() => {
    const { firstName, lastName } = chef;
    setDocumentTitle(`${firstName} ${lastName}`);
  }, []);

  const createRecipeCta = (
    <Link to={'/recipe/new'}>
      <Button type={'primary'} icon={'form'} block>
        Create a recipe
      </Button>
    </Link>
  );

  console.log(chef.recipes);

  return (
    !isEmpty(chef) && (
      <div className={cn(styles.page, className)} data-testid={'Profile'}>
        <ProfileChef className={styles.profileChef} {...chef} />
        <Tabs defaultActiveKey={'My Recipes'}>
          <Tabs.TabPane tab={'My Recipes'} key={'My Recipes'}>
            {!isEmpty(chef.recipes) && (
              <div className={styles.cta}>{createRecipeCta}</div>
            )}
            <Recipes
              recipes={chef.recipes}
              $component={ProfileRecipe}
              empty={
                <Empty
                  className={styles.empty}
                  description={createRecipeCta}
                  data-testid={'Empty'}
                />
              }
            />
          </Tabs.TabPane>
        </Tabs>
      </div>
    )
  );
};

export default asPage(Profile);
