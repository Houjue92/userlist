import axios from '../../node_modules/axios';
const API_URL = 'http://localhost:8080/api/users';

function requestStart() {
  return {
    type: 'REQUEST_USERS_START'
  };
}
function requestSuccess(users) {
  return {
    type: 'REQUEST_USERS_SUCCESS',
    users
  };
}
function requestFail(error) {
  return {
    type: 'REQUEST_USERS_FAIL',
    error
  };
}
export function getUsers() {
  return (dispatch, getState) => {
    dispatch(requestStart());
    axios
      .get(API_URL)
      .then(response => {
        dispatch(requestSuccess(response.data));
      })
      .catch(err => {
        dispatch(requestFail(err.response.statusText));
      });
  };
}
