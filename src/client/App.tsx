import React, { useEffect } from 'react';
import { Layout } from 'antd';

import Loader from './components/Loader';
import Dashboard from './components/Dashboard';

import { fetchUsers } from './actions';

import { UserApiType } from './types/user';

type Props = {
  dispatch: (...args: any[]) => void;
  data: UserApiType[];
  isFetching: boolean;
};

const App: React.FC<Props> = ({ dispatch, data, isFetching }) => {
  useEffect(() => {
    if (data.length === 0 && !isFetching) {
      dispatch(fetchUsers());
    }
  });

  if (data.length === 0) {
    return <Loader />;
  }

  return (
    <Layout>
      <Dashboard data={data} />
    </Layout>
  );
};

export default App;
