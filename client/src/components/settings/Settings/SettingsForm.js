import React from 'react';
import PropTypes from 'prop-types';

import Form from '../../common/Form/Form';

import { userInfoProps, mutationProps } from '../../propTypes';

import {
  FormWrapper,
} from './styled';

const SettingsForm = (props) => {
  const {
    mode,
    user,
    updateUser,
    updateUserResult,
  } = props;

  return (
    <FormWrapper>
      <Form
        formId="user"
        initialValues={user}
        mutation={updateUser}
        result={updateUserResult}
        submitButtonText="Confirm"
        formInputVariant="outlined"
        readOnly={mode === 'read'}
        submitButtonSize="medium"
      />
    </FormWrapper>
  );
};

SettingsForm.defaultProps = {
  user: {},
};
SettingsForm.propTypes = {
  mode: PropTypes.oneOf(['read', 'edit']).isRequired,
  user: PropTypes.shape(userInfoProps),
  updateUser: PropTypes.func.isRequired,
  updateUserResult: PropTypes.shape(mutationProps).isRequired,
};

export default SettingsForm;
