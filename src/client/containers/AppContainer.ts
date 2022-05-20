import { connect } from 'react-redux';

import App from '../App';
import ReduxState from '../types/reduxState';

const mapStateToProps = (state: ReduxState) => {
  const { users, isFetching } = state.users;
  return {
    data: users,
    isFetching,
  };
};

export default connect(mapStateToProps)(App);
