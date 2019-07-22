import { transform, forEach, set } from 'lodash';
import * as yup from 'yup';

export const formFields = {
  signIn: [{
    name: 'username',
    label: 'User Name / Email Address',
    type: 'text',
    autoComplete: 'on',
    required: true,
    initialValue: '',
  }, {
    name: 'password',
    label: 'Password',
    type: 'password',
    autoComplete: 'on',
    required: true,
    initialValue: '',
  }],
  signUpStepOne: [{
    name: 'username',
    label: 'User Name',
    type: 'text',
    autoComplete: 'on',
    required: true,
    initialValue: '',
  }, {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    autoComplete: 'on',
    required: true,
    initialValue: '',
  }, {
    name: 'password',
    label: 'Password',
    type: 'password',
    autoComplete: 'on',
    required: true,
    initialValue: '',
  }],
  signUpStepTwo: [{
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    autoComplete: 'on',
    required: true,
    initialValue: '',
  }, {
    name: 'lastName',
    label: 'Last name',
    type: 'text',
    autoComplete: 'on',
    required: true,
    initialValue: '',
  }, {
    name: 'gender',
    label: 'Gender',
    type: 'radio',
    autoComplete: 'off',
    required: true,
    initialValue: 'Male',
    values: ['Male', 'Female', 'Other'],
  }, {
    name: 'birthday',
    label: 'Birthday',
    type: 'date',
    autoComplete: 'off',
    required: false,
    initialValue: '',
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
        res[name] = yup.string();
        break;
      }
      case 'birthday': {
        res[name] = yup.date().typeError('');
        break;
      }
    }
  }), {}),
};

export const formInitialValues = transform(formFields, (res, values, formName) => {
  res[formName] = {};

  forEach(values, ({ name, initialValue }) => {
    set(res[formName], name, initialValue);
  });
}, {});


export default formId => ({
  fields: formFields[formId],
  validationSchema: formValidationSchemas[formId],
  initialValues: formInitialValues[formId],
});
