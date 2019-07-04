import React, { useEffect, useState, useContext } from 'react';
import { isEmpty } from 'lodash';
import wretch from 'wretch';
import cn from 'classnames';
import { Empty, Button, Tabs } from 'antd';

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
  const [chef, setChef] = useState({});
  const [username] = useContext(UserContext);

  useEffect(() => {
    wretch(`${api.GET_CHEF_PROFILE}/${username}`)
      .get()
      .json((chef) => {
        setChef(chef);

        const { firstName, lastName } = chef;
        setDocumentTitle(`${firstName} ${lastName}`);
      });
  }, []);

  const createRecipeCta = (
    <Button type={'primary'} icon={'form'}>
      Create a recipe
    </Button>
  );

  const forkRecipeCta = (
    <Button type={'primary'} icon={'form'}>
      Fork a recipe
    </Button>
  );

  const tabs = [
    {
      tab: 'My Recipes',
      recipes: (recipes) => recipes.filter(({ base }) => isEmpty(base)),
      cta: createRecipeCta,
    },
    {
      tab: 'Forked',
      recipes: (recipes) => recipes.filter(({ base }) => !isEmpty(base)),
      cta: forkRecipeCta,
    },
  ];

  return (
    !isEmpty(chef) && (
      <div className={cn(styles.page, className)} data-testid={'Profile'}>
        <ProfileChef className={styles.profileChef} {...chef} />

        <Tabs defaultActiveKey={'My Recipes'}>
          {tabs.map(({ tab, recipes, cta }) => (
            <Tabs.TabPane tab={tab} key={tab}>
              {isEmpty(recipes(chef.recipes)) ? (
                <Empty
                  className={styles.empty}
                  description={cta}
                  data-testid={'Empty'}
                />
              ) : (
                <Recipes
                  recipes={recipes(chef.recipes)}
                  $component={ProfileRecipe}
                />
              )}
            </Tabs.TabPane>
          ))}
        </Tabs>
      </div>
    )
  );
};

export default asPage(Profile);
