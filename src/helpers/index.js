import { upperCase, isEmpty } from 'lodash';
import moment from 'moment';

import icqBeep from '../assets/audio/icqBeep';

export const getAvatarInitials = (user = null) => {
  if (!user || isEmpty(user)) return '';

  const { firstName, lastName } = user;
  const firstLater = upperCase(firstName[0]);

  if (!lastName) {
    return firstLater;
  }
  const lastLater = upperCase(lastName[0]);

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

export const icqBeepPlay = () => icqBeep.play();

export const getBase64 = file => new Promise((res, rej) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    res(reader.result);
  };
  reader.onerror = (error) => {
    rej(error);
  };
});
