import { upperCase } from 'lodash';
import moment from 'moment';

export const getContactInitials = (first, last = '') => {
  const firstLater = upperCase(first[0]);

  if (!first) {
    throw new Error('No argument!');
  } else if (!last) {
    return firstLater;
  }
  const lastLater = upperCase(last[0]);

  return `${firstLater}${lastLater}`;
};

export const historyDateParser = date => moment(date).format('dddd, MMMM D, YYYY');
export const messageShortTimeParser = time => moment(time).format('LT');
export const messageWideTimeParser = time => moment(time).format('LTS');
