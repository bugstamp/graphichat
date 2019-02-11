import { transform } from 'lodash';
import * as yup from 'yup';

export const formFields = {
  signIn: [{
    name: 'username',
    label: 'User Name / Email Address',
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
  signUpStepOne: [{
    name: 'username',
    label: 'User Name',
    type: 'text',
    autoComplete: 'off',
    required: true,
  }, {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    autoComplete: 'off',
    required: true,
  }, {
    name: 'password',
    label: 'Password',
    type: 'password',
    autoComplete: 'off',
    required: true,
  }, {
    name: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password',
    autoComplete: 'off',
    required: true,
  }],
  signUpStepTwo: [{
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    autoComplete: 'off',
    required: true,
  }, {
    name: 'lastName',
    label: 'Last name',
    type: 'text',
    autoComplete: 'off',
    required: true,
  }, {
    name: 'gender',
    label: 'Gender',
    type: 'text',
    autoComplete: 'off',
    required: true,
  }, {
    name: 'birthday',
    label: 'Birthday',
    type: 'date',
    autoComplete: 'off',
    required: true,
  }],
};

export const formValidationSchemas = {
  signIn: yup.object().shape(transform(formFields.signIn, (res, { name }) => {
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
  signUpStepOne: yup.object().shape(transform(formFields.signUpStepOne, (res, { name }) => {
    // eslint-disable-next-line
    switch (name) {
      case 'username': {
        res[name] = yup.string().required('*required');
        break;
      }
      case 'email': {
        res[name] = yup.string().email().required('*required');
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
  signUpStepTwo: yup.object().shape(transform(formFields.signUpStepTwo, (res, { name }) => {
    // eslint-disable-next-line
    switch (name) {
      case 'firstName': {
        res[name] = yup.string().required('*required');
        break;
      }
      case 'lastName': {
        res[name] = yup.string().required('*required');
        break;
      }
      case 'gender': {
        res[name] = yup.string().required('*required');
        break;
      }
      case 'birthday': {
        res[name] = yup.date().required('*required');
        break;
      }
    }
  }), {}),
};
