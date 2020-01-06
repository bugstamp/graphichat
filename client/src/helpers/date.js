import config from 'config';
import moment from 'moment';

const { messageDateFormats } = config;

const messageDateParsers = {
  historyDate: date => moment(date).format(messageDateFormats.historyDate),
  messageHistoryDate: date => moment(date)
    .calendar(null, messageDateFormats.messageHistoryDate),
  messageTime: (time, variant = 'short') => {
    const format = messageDateFormats.messageTime[variant];

    if (variant === 'wide') {
      return moment(time).format(format);
    }
    return moment(time).calendar(null, format);
  },
  userLastDate: date => moment(date).calendar(null, messageDateFormats.userLastDate),
};

const isSameDay = (date, referenceDate) => {
  if (!date || !referenceDate) {
    return undefined;
  }

  const a = moment(date);
  const b = moment(referenceDate);
  const diff = a.isSame(b, 'days');

  return diff;
};

export {
  messageDateParsers,
  isSameDay,
};
