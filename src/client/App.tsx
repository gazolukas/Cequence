import React, { useState } from 'react';
import { Layout, Row, Col, Table } from 'antd';
import { Moment } from 'moment';
import { Formik, Form, FieldArray } from 'formik';

import Chart from './components/Chart';
import DatePicker from './components/DatePicker';
import Popup from './components/Popup';

import data from './mocks/data';

import { UserApiType } from './types/user';
import { table_columns } from './const/table';
import { filter } from './utils/chart';

const App: React.FC = () => {
  const [dateFrom, setDateFrom] = useState<Moment | null>(null);
  const [dateTo, setDateTo] = useState<Moment | null>(null);
  const [userData, setUserData] = useState<UserApiType | null>(null);

  const handleDatePickerChange = (dateRange: Moment[]) => {
    setDateFrom((dateRange && dateRange[0]) || null);
    setDateTo((dateRange && dateRange[1]) || null);
  };

  const handlePopupClick = (values: UserApiType) => setUserData(values);

  return (
    <Layout>
      <Formik<UserApiType[]>
        initialValues={data}
        onSubmit={() => {}}
      >
        {({ values }) => (
          <Form>
            <FieldArray name="users">
              {() => (
                <>
                  <Row>
                    <Col span={18}>
                      <Chart data={filter(values, dateFrom, dateTo)} />
                    </Col>
                    <Col span={6}>
                      <DatePicker onChange={handleDatePickerChange} />
                    </Col>
                  </Row>
                  <Table
                    dataSource={values}
                    onRow={(record) => {
                      return {
                        onClick: () => handlePopupClick(record),
                      };
                    }}
                    columns={table_columns}
                  />
                  {userData && (
                    <Popup userData={userData} setUserData={setUserData} />
                  )}
                </>
              )}
            </FieldArray>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default App;
