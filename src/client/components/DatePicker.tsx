import React from 'react';
import { Card, DatePicker as AntdDatePicker } from 'antd';
import withStyles, { WithStylesProps } from 'react-jss';

type Props = {
  onChange: (e: any) => void;
};

const DatePicker: React.FC<WithStylesProps<any> & Props> = ({ classes, onChange }) => {
  const { RangePicker } = AntdDatePicker;

  return (
    <Card title="Date of birth" className={classes.height}>
      <RangePicker onChange={onChange} />
    </Card>
  );
};

export default withStyles(() => ({
  height: {
    height: '100%',
  },
}))(DatePicker);
