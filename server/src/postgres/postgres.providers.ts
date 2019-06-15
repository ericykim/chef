import RecipeService from './recipe.service';

const servicesMap = {
  Recipe: RecipeService,
};

export function createDatabaseProviders(entities: Array<Function>) {
  return entities.reduce((acc, entity) => {
    const service = servicesMap[entity.name];
    return service ? acc.concat(service) : acc;
  }, []);
}
