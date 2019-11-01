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
  const [chef, setChef] = useState({});
  const [{ username }] = useContext(UserContext);

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
    <Link to={'/recipe/new'}>
      <Button type={'primary'} icon={'form'} block>
        Create a recipe
      </Button>
    </Link>
  );

  const forkRecipeCta = (
    <Button type={'primary'} icon={'form'} block>
      Fork a recipe
    </Button>
  );

  const tabs = [
    {
      tab: 'My Recipes',
      filterRecipes: (recipes) => recipes.filter(({ base }) => isEmpty(base)),
      cta: createRecipeCta,
      empty: (
        <Empty
          className={styles.empty}
          description={createRecipeCta}
          data-testid={'Empty'}
        />
      ),
    },
    {
      tab: 'Forked',
      filterRecipes: (recipes) => recipes.filter(({ base }) => !isEmpty(base)),
      cta: forkRecipeCta,
      empty: (
        <Empty
          className={styles.empty}
          description={forkRecipeCta}
          image={<Icon className={styles.forkIcon} type={'fork'} />}
          data-testid={'Empty'}
        />
      ),
    },
  ];

  return (
    !isEmpty(chef) && (
      <div className={cn(styles.page, className)} data-testid={'Profile'}>
        <ProfileChef className={styles.profileChef} {...chef} />

        <Tabs defaultActiveKey={'My Recipes'}>
          {tabs.map(({ tab, filterRecipes, cta, empty }) => (
            <Tabs.TabPane tab={tab} key={tab}>
              {!isEmpty(filterRecipes(chef.recipes)) && (
                <div className={styles.cta}>{cta}</div>
              )}

              <Recipes
                recipes={filterRecipes(chef.recipes)}
                $component={ProfileRecipe}
                empty={empty}
              />
            </Tabs.TabPane>
          ))}
        </Tabs>
      </div>
    )
  );
};

export default asPage(Profile);
