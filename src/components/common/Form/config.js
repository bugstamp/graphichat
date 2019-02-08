import { transform } from 'lodash';
import * as yup from 'yup';

export const formFields = {
  signin: [{
    name: 'username',
    label: 'User name / Email address',
    type: 'text',
    autoComplete: 'on',
    required: true,
  }, {
    name: 'password',
    label: 'Password',
    type: 'password',
    autoComplete: 'on',
    required: true,
  }],
};

export const formValidationSchemas = {
  signin: yup.object().shape(transform(formFields.signin, (res, { name }) => {
    // eslint-disable-next-line
    switch (name) {
      case 'username': {
        res[name] = yup.string().required('*required');
        break;
      }
      case 'password': {
        res[name] = yup.string()
          .min(6)
          .max(20)
          .required('*required');
        break;
      }
    }
  }), {}),
};
