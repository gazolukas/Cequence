import fetch from 'cross-fetch';
import { AnyAction, Dispatch } from 'redux';

export const REQUEST_USERS = 'REQUEST_USERS';
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const INVALIDATE_USERS = 'INVALIDATE_USERS';

export const REQUEST_USER = 'REQUEST_USER';
export const RECEIVE_USER = 'RECEIVE_USER';
export const INVALIDATE_USER = 'INVALIDATE_USER';

function requestUsers() {
  return {
    type: REQUEST_USERS,
  };
}

function receiveUsers(json: JSON) {
  return {
    type: RECEIVE_USERS,
    posts: json,
  };
}

export function fetchUsers() {
  return (dispatch: Dispatch<AnyAction>) => {
    dispatch(requestUsers());
    return fetch(`https://run.mocky.io/v3/a32f2030-32b0-4c5d-8ada-c3b67cf2cbfe`)
      .then((response) => response.json())
      .then((json) => dispatch(receiveUsers(json)));
  };
}
