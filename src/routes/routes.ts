export const API_VERSION = 1;

const composePath = (path: string): string => {
  return `/v${API_VERSION}${path}`;
}

export const Users = {
  REGISTER_TELEGRAM: composePath('/users/register/telegram'),
  LOGIN_TELEGRAM: composePath('/users/login/telegram'),
  REGISTER_APP: composePath('/users/register/app'),
  LOGIN_APP: composePath('/users/login/app'),
};

export const Rides = {
  CREATE: composePath('/rides'),
  SEARCH: composePath('/rides/search'),
};
