export interface JwtPayload {
  email: string;
}

// Registration payload
export interface Registration {
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
}

/**
 * Login payload
 *
 * handle: email or username of user
 */
export interface Login {
  handle: string;
  password: string;
}
