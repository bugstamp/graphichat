import { upperCase } from 'lodash';
import moment from 'moment';

export const getContactInitials = (first = '', last = '') => {
  if (!first) return '';

  const firstLater = upperCase(first[0]);
  if (!last) {
    return firstLater;
  }
  const lastLater = upperCase(last[0]);

  return `${firstLater}${lastLater}`;
};

export const historyDateParser = date => moment(date).format('dddd, MMMM D, YYYY');

const shortMessageTimeParser = date => moment(date).calendar(null, {
  sameDay: 'HH:mm',
  lastDay: 'ddd',
  lastWeek: 'ddd',
  sameElse: 'DD/MM/YY',
});

export const messageTimeParser = (time, variant = 'short') => {
  if (variant === 'wide') {
    return moment(time).format('HH:mm:ss');
  }
  return shortMessageTimeParser(time);
};

export const userLastDateParser = date => moment(date).calendar(null, {
  sameDay: '[today at] HH:mm',
  lastDay: '[yesterday at] HH:mm',
  lastWeek: '[last] dddd [at] HH:mm',
  sameElse: 'DD/MM/YYYY',
});

const messageHistoryDateFormat = 'dddd, MMMM D, YYYY';

export const messageHistoryDateParser = date => moment(date).calendar(null, {
  sameDay: '[Today]',
  lastDay: '[Yesterday]',
  lastWeek: messageHistoryDateFormat,
  sameElse: messageHistoryDateFormat,
});

export const isSameDay = (date, referenceDate) => {
  const a = moment(date);
  const b = moment(referenceDate);
  const diff = a.isSame(b, 'days');

  return diff;
};
