export const PROTOCOL = 'http';
export const API_BASE_URL = `${PROTOCOL}://localhost:3000`;

export default {
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  GET_CHEF_PROFILE: `${API_BASE_URL}/chef`,
};
