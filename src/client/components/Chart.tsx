import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { UserType } from '../types/users';

type Props = {
  data: UserType[];
};

const Chart: React.FC<Props> = ({ data }) => {
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={{
        chart: {
          type: 'pie',
        },
        title: {
          text: 'Country & Users',
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.y}</b>',
        },
        plotOptions: {
          pie: {
            dataLabels: {
              format: '<b>{point.country}</b>: {point.y}',
            },
          },
        },
        series: [
          {
            name: 'Users',
            data,
          },
        ],
      }}
    />
  );
};

export default Chart;
