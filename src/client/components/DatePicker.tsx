import React from 'react';
import { Card, DatePicker as AntdDatePicker } from 'antd';

type Props = {
  onChange: (e: any) => void;
};

const DatePicker: React.FC<Props> = ({ onChange }) => {
  const { RangePicker } = AntdDatePicker;

  return (
    <Card title="Date of birth">
      <RangePicker onChange={onChange} />
    </Card>
  );
};

export default DatePicker;
