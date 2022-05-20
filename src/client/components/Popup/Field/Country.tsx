import React from 'react';
import { Field, FieldProps } from 'formik';
import { Select } from 'antd';
import withStyles, { WithStylesProps } from 'react-jss';

const Country: React.FC<WithStylesProps<any>> = ({ classes }) => {
  const { Option } = Select;

  return (
    <Field name="country">
      {({ field, form, meta }: FieldProps) => {
        const onChange = (value: string) => {
          const country = value || '';
          form.setFieldValue(field.name, country);
        };

        return (
          <div>
            <Select
              {...field}
              onChange={onChange}
              className={classes.width}
              placeholder="Select country"
            >
              <Option value="Poland">Poland</Option>
              <Option value="France">France</Option>
              <Option value="United Kingdom">United Kingdom</Option>
              <Option value="Germany">Germany</Option>
              <Option value="Hungary">Hungary</Option>
              <Option value="Austria">Austria</Option>
            </Select>
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
}))(Country);
