import PropTypes from 'prop-types';

export const mutationResultProps = {
  called: PropTypes.bool,
  client: PropTypes.objectOf(PropTypes.any),
  data: PropTypes.objectOf(PropTypes.any),
  error: PropTypes.objectOf(PropTypes.any),
  loading: PropTypes.bool,
};

export const mutationProps = {
  mutation: PropTypes.func,
  name: PropTypes.string,
  result: PropTypes.shape(mutationResultProps),
};

export const formFieldsProps = {
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  autoComplete: PropTypes.oneOf(['on', 'off']),
  required: PropTypes.bool,
  initialValue: PropTypes.string,
};

export const formAsyncValidationFieldsProps = {
  name: PropTypes.string,
  validation: PropTypes.shape(mutationProps),
};

export const messageProps = {
  content: PropTypes.string,
  edited: PropTypes.bool,
  id: PropTypes.string,
  seen: PropTypes.bool,
  senderId: PropTypes.string,
  time: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  type: PropTypes.oneOf(['system', 'text']),
  __typename: PropTypes.string,
};

export const meProps = {
  id: PropTypes.string,
  avatar: PropTypes.shape({
    sm: PropTypes.string,
    md: PropTypes.string,
  }),
  displayName: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  status: PropTypes.oneOf(['ONLINE', 'OFFLINE']),
  username: PropTypes.string,
};

export const chatProps = {
  id: PropTypes.string,
  messages: PropTypes.arrayOf(PropTypes.shape(messageProps)),
};

export const userAvatarProps = {
  sm: PropTypes.string,
  md: PropTypes.string,
};

export const userInfoProps = {
  avatar: PropTypes.shape(userAvatarProps),
  displayName: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  status: PropTypes.string,
  username: PropTypes.string,
  lastDate: PropTypes.string,
  __typename: PropTypes.string,
};

export const contactProps = {
  chatId: PropTypes.string,
  id: PropTypes.string,
  userInfo: PropTypes.shape(userInfoProps),
  __typename: PropTypes.string,
};

export default undefined;
