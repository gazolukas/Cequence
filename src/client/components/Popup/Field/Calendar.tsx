import React from 'react';
import { DatePicker } from 'antd';
import { Field, FieldProps } from 'formik';
import moment, { Moment } from 'moment';
import withStyles, { WithStylesProps } from 'react-jss';

import { DATE_FORMAT } from '../../../const/format';

const Calendar: React.FC<WithStylesProps<any>> = ({ classes }) => {
  return (
    <Field name="birthday">
      {({ field, form, meta }: FieldProps) => {
        const onChange = (value: Moment | null): void => {
          const date = value ? moment(value).format(DATE_FORMAT) : '';
          form.setFieldValue(field.name, date);
        };
        const value = field.value ? moment(field.value) : null;
        const status = meta.touched && meta.error ? 'error' : undefined;

        return (
          <div>
            <DatePicker
              {...field}
              onChange={onChange}
              className={classes.width}
              value={value}
              status={status}
            />
            {meta.touched && meta.error && <div className={classes.error}>{meta.error}</div>}
          </div>
        );
      }}
    </Field>
  );
};

export default withStyles(({ color }: any) => ({
  error: {
    color: color.error,
  },
  width: {
    width: 150,
  },
}))(Calendar);
