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
export const messageTimeParser = (time, variant = 'short') => {
  const format = variant === 'short' ? 'LT' : 'LTS';

  return moment(time).format(format);
};

export const userLastDateParser = (date) => {
  return moment().calendar(date, {
    sameDay: '[today at] HH:mm',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd',
    lastDay: '[yesterday at] HH:mm',
    lastWeek: '[last] dddd [at] HH:mm',
    sameElse: 'DD/MM/YYYY',
  });
};
