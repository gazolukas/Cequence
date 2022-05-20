import { INITIAL_STATE as USERS_INITIAL_STATE } from '../reducers/users';

interface ReduxState {
  users: typeof USERS_INITIAL_STATE;
}

export default ReduxState;
