import React, { useState } from 'react';
import { Row, Col, Table } from 'antd';
import { Moment } from 'moment';

import Chart from './Chart';
import DatePicker from './DatePicker';
import Popup from './Popup';

import { UserApiType } from '../types/user';
import { tableColumns } from '../const/table';
import { filter } from '../utils/chart';

import { context } from '../context';

type Props = {
  data: UserApiType[];
};

const Dashboard: React.FC<Props> = ({ data }) => {
  const [users, updateUser] = useState<UserApiType[]>(data || []);
  const [dateFrom, setDateFrom] = useState<Moment | null>(null);
  const [dateTo, setDateTo] = useState<Moment | null>(null);
  const [userData, setUserData] = useState<UserApiType | null>(null);

  const handleDatePickerChange = (dateRange: Moment[]): void => {
    setDateFrom((dateRange && dateRange[0]) || null);
    setDateTo((dateRange && dateRange[1]) || null);
  };

  const handlePopupClick = (values: UserApiType): void => setUserData(values);

  return (
    <context.Provider
      value={{
        users,
        updateUser,
      }}
    >
      <Row>
        <Col span={12}>
          <Chart data={filter(users, dateFrom, dateTo)} />
        </Col>
        <Col span={12}>
          <DatePicker onChange={handleDatePickerChange} />
        </Col>
      </Row>
      <Table
        dataSource={users}
        onRow={(record) => {
          return {
            onClick: () => handlePopupClick(record),
          };
        }}
        columns={tableColumns}
      />
      {userData && <Popup userData={userData} setUserData={setUserData} />}
    </context.Provider>
  );
};

export default Dashboard;
