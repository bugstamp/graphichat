import { upperCase, isEmpty } from 'lodash';

const getAvatar = (user = {}, size = 'sm') => {
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

export {
  getAvatar,
};
