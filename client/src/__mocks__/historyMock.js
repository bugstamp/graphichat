export const historyPushMock = jest.fn(str => str);

const historyMock = {
  push: historyPushMock,
};

export default historyMock;
