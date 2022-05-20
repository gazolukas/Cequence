import React from 'react';

import { UserApiType } from './types/user';

export type Context = {
  users: UserApiType[];
  updateUser: (users: UserApiType[]) => void;
};

const context = React.createContext<Context>({
  users: [],
  updateUser: () => {
    return [];
  },
});

export { context };
