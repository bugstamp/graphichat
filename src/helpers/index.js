import { upperCase } from 'lodash';

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

export default undefined;
