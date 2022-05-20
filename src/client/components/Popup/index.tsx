import React, { useContext } from 'react';
import { Modal, Typography, Space, Row, Col } from 'antd';
import { Formik, Form } from 'formik';
import withStyles, { WithStylesProps } from 'react-jss';

import Calendar from './Field/Calendar';
import Country from './Field/Country';

import { UserApiType } from '../../types/user';
import { schema } from '../../validation/popup';
import { context } from '../../context';

type Props = {
  userData: UserApiType | null;
  setUserData: React.Dispatch<React.SetStateAction<UserApiType | null>>;
};

const Popup: React.FC<WithStylesProps<any> & Props> = ({ classes, userData, setUserData }) => {
  const { updateUser, users } = useContext(context);

  const { Text } = Typography;

  const handlePopupCancel = () => setUserData(null);

  if (!userData) {
    throw Error('There are no data for this form.');
  }

  return (
    <Formik<UserApiType>
      initialValues={userData}
      validationSchema={schema}
      onSubmit={(userValues) => {
        updateUser(
          users.map((user) => {
            if (user.id === userValues.id) {
              return userValues;
            }
            return user;
          }),
        );
        setUserData(null);
      }}
      enableReinitialize
    >
      {({ values, handleSubmit }) => (
        <Modal
          title={`User: ${userData.first_name} ${userData.last_name}`}
          visible={Boolean(userData)}
          onOk={() => handleSubmit()}
          onCancel={handlePopupCancel}
          okButtonProps={{
            htmlType: 'submit',
          }}
        >
          <Form>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <Row className={classes.row}>
                <Col span={8} className={classes.alignment}>
                  <Text>Date of birth:</Text>
                </Col>
                <Col span={16}>
                  <Calendar />
                </Col>
              </Row>
              <Row className={classes.row}>
                <Col span={8} className={classes.alignment}>
                  <Text>Country:</Text>
                </Col>
                <Col span={16}>
                  <Country />
                </Col>
              </Row>
              <Row className={classes.row}>
                <Col span={8}>
                  <Text>Email:</Text>
                </Col>
                <Col span={16}>
                  <Text type="secondary">{values.email}</Text>
                </Col>
              </Row>
            </Space>
          </Form>
        </Modal>
      )}
    </Formik>
  );
};

export default withStyles(() => ({
  alignment: {
    display: 'flex',
    alignItems: 'start',
    marginTop: 4,
  },
  row: {
    minHeight: 32,
  },
}))(Popup);
