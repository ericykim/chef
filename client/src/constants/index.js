export const PROTOCOL = 'http';
export const API_BASE_URL = `${PROTOCOL}://localhost:3000`;

export default {
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  GET_CHEF_PROFILE: `${API_BASE_URL}/chef`,
  GET_RECIPE: `${API_BASE_URL}/recipe`,
  GET_LABELED_RECIPES: `${API_BASE_URL}/recipe/labels`,
  CREATE_RECIPE: `${API_BASE_URL}/recipe`,
  DELETE_RECIPE: `${API_BASE_URL}/recipe`,
};
