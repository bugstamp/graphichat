// import _ from 'lodash';

import {
  messageDateParsers,
  isSameDay,
} from './date';
import {
  isEven,
} from './number';
import {
  getAvatar,
} from './user';

const testDate = new Date(2019, 1, 1, 0, 0, 0, 0);
const testNextDate = new Date(2019, 1, 2, 0, 0, 0, 0);
const mockUser = {
  firstName: 'firstName',
  lastName: 'lastName',
};
const mockUserAvatar = {
  sm: 'smAvatar',
  md: 'mdAvatar',
};

describe('test date helpers', () => {
  describe('test message date parsers', () => {
    describe('test history date parser', () => {
      it('if parser is exist', () => {
        expect(messageDateParsers).toHaveProperty('historyDate');
        expect(messageDateParsers.historyDate).toBeInstanceOf(Function);
      });

      it('if parser work', () => {
        expect(messageDateParsers.historyDate(testDate)).toEqual('Friday, February 1, 2019');
      });
    });

    describe('test message history date parser', () => {
      it('if parser is exist', () => {
        expect(messageDateParsers).toHaveProperty('messageHistoryDate');
        expect(messageDateParsers.messageHistoryDate).toBeInstanceOf(Function);
      });

      it('if parser work', () => {
        expect(messageDateParsers.messageHistoryDate(testDate)).toEqual('Friday, February 1, 2019');
      });
    });

    describe('test message time parser', () => {
      it('if parser is exist', () => {
        expect(messageDateParsers).toHaveProperty('messageTime');
        expect(messageDateParsers.messageTime).toBeInstanceOf(Function);
      });

      it('if parser work', () => {
        expect(messageDateParsers.messageTime(testDate, 'short')).toEqual('01/02/19');
        expect(messageDateParsers.messageTime(testDate, 'wide')).toEqual('00:00:00');
      });
    });

    describe('test user last date parser', () => {
      it('if parser is exist', () => {
        expect(messageDateParsers).toHaveProperty('userLastDate');
        expect(messageDateParsers.userLastDate).toBeInstanceOf(Function);
      });

      it('if parser work', () => {
        expect(messageDateParsers.userLastDate(testDate)).toEqual('01/02/2019');
      });
    });
  });

  it('test isSameDay', () => {
    expect(isSameDay(testDate)).toBeUndefined();
    expect(isSameDay()).toBeUndefined();
    expect(isSameDay(testDate, testNextDate)).toEqual(false);
    expect(isSameDay(testDate, testDate)).toEqual(true);
  });
});

describe('test number helpers', () => {
  it('test isEven', () => {
    expect(isEven()).toEqual(false);
    expect(isEven(1)).toEqual(false);
    expect(isEven(2)).toEqual(true);
  });
});

describe('test user helpers', () => {
  it('test getAvatar', () => {
    expect(getAvatar()).toMatchObject({
      src: '',
      text: '',
    });
    expect(getAvatar(mockUser)).toMatchObject({
      src: '',
      text: 'FL',
    });
    expect(getAvatar({ avatar: mockUserAvatar }, 'sm')).toMatchObject({
      src: 'smAvatar',
      text: '',
    });
    expect(getAvatar({ avatar: mockUserAvatar }, 'md')).toMatchObject({
      src: 'mdAvatar',
      text: '',
    });
    expect(getAvatar({
      ...mockUser,
      avatar: mockUserAvatar,
    }, 'sm')).toMatchObject({
      src: 'smAvatar',
      text: 'FL',
    });
  });
});
