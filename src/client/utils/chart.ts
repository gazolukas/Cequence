import moment, { Moment } from 'moment';

import { UserApiType } from '../types/user';
import { ChartType } from '../types/chart';

export const filter = (
  data: UserApiType[],
  from: Moment | null,
  to: Moment | null,
): ChartType[] => {
  const result: ChartType[] = [];

  data
    .filter(({ birthday }) => {
      // Filter by date
      if (from && to) {
        return moment(birthday).isBetween(from, to, 'day', '[]');
      }
      return true;
    })
    .forEach((person) => {
      // Get number of people for specific country
      if (
        result.some((val) => {
          return val.country === person.country;
        })
      ) {
        result.forEach((val) => {
          if (val.country === person.country) {
            val.y += 1;
          }
        });
      } else {
        const obj = {} as ChartType;

        obj.country = person.country;
        obj.y = 1;
        result.push(obj);
      }
    });

  return result;
};
