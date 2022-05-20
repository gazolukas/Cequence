import { INVALIDATE_USERS, REQUEST_USERS, RECEIVE_USERS } from '../actions';

export const INITIAL_STATE = {
  isFetching: false,
  users: [],
};

function posts(
  state = {
    isFetching: false,
    didInvalidate: false,
  },
  action,
) {
  switch (action.type) {
    case INVALIDATE_USERS:
      return {
        ...state,
        didInvalidate: true,
      };
    case REQUEST_USERS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      };
    case RECEIVE_USERS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        users: [...action.posts],
      };
    default:
      return state;
  }
}

function users(state = INITIAL_STATE, action) {
  switch (action.type) {
    case INVALIDATE_USERS:
    case RECEIVE_USERS:
    case REQUEST_USERS:
      return {
        ...state,
        ...posts(state[action.posts], action),
      };
    default:
      return state;
  }
}

export default users;
