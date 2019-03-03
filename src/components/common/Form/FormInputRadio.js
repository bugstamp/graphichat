import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import { map } from 'lodash';
import styled from 'styled-components';
// import { position } from 'polished';

const RadioFormControlStyled = styled(FormControl)`
  && {
    position: relative;
    margin-bottom: 1.5em;
  }
`;

const RadioGroupStyled = styled(RadioGroup)`
  && {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
  }
`;

const FormInputRadio = ({
  name,
  // type,
  label,
  values,
  initialValue,
  // placeholder,
  // required,
  // autoComplete,
  // error,
  // isError,
  validate,
  validateField,
  onChange,
  // onBlur,
  // ...rest,
}) => (
  <Field name={name} validate={value => validate(value, name)}>
    {({ field }) => (
      <RadioFormControlStyled variant="standard" fullWidth>
        <InputLabel shrink>{label}</InputLabel>
        <RadioGroupStyled
          {...field}
          name={name}
          onChange={(event) => {
            validateField(name);

            onChange(event);
          }}
        >
          {map(values, value => (
            <FormControlLabel
              key={value}
              value={value}
              control={<Radio />}
              label={value}
            />
          ))}
        </RadioGroupStyled>
      </RadioFormControlStyled>
    )}
  </Field>
);

export default FormInputRadio;
