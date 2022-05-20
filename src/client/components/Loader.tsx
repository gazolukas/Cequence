import React from 'react';
import { Spin } from 'antd';
import withStyles, { WithStylesProps } from 'react-jss';

const Loader: React.FC<WithStylesProps<any>> = ({ classes }) => {
  return (
    <div className={classes.center}>
      <Spin size="large" />
    </div>
  );
};

export default withStyles(() => ({
  center: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
}))(Loader);
