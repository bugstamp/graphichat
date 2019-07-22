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

export default undefined;
