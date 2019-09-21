import { upperCase, isEmpty } from 'lodash';
import moment from 'moment';

import icqBeep from '../assets/audio/icqBeep';

export const getAvatar = (user = {}, size = 'sm') => {
  let src = '';
  let text = '';

  if (!isEmpty(user)) {
    const { avatar, firstName, lastName } = user;
    let firstLater = '';
    let lastLater = '';

    if (avatar && avatar[size]) {
      src = avatar[size];
    }

    if (firstName) {
      firstLater = upperCase(firstName[0]);
    }
    if (lastName) {
      lastLater = upperCase(lastName[0]);
    }
    text = `${firstLater}${lastLater}`;
  }

  return {
    src,
    text,
  };
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

export const isEven = (n) => {
  return n % 2 === 0;
};
