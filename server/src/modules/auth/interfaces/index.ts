import { Record, String, Static } from 'runtypes';

export interface JwtPayload {
  email: string;
}

/**
 * Chef Registration credentials
 */
export const Registration = Record({
  email: String,
  password: String,
  username: String,
  firstName: String,
  lastName: String,
});

export type Registration = Static<typeof Registration>;

/**
 * Chef Login credentials
 *
 * handle: either email or username
 */
export const Login = Record({
  handle: String,
  password: String,
});

export type Login = Static<typeof Login>;
