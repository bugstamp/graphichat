import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import Radio from '@material-ui/core/Radio';
import MaterialRadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import styled from 'styled-components';
// import { position } from 'polished';
import { map } from 'lodash';

const RadioFormControl = styled(FormControl)`
  && {
    position: relative;
    margin-bottom: 1.5em;
  }
`;

const RadioGroup = styled(MaterialRadioGroup)`
  && {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
  }
`;

const FormInputRadio = ({
  name,
  values,
  validate,
  validateField,
  onChange,
}) => (
  <Field name={name} validate={value => validate(value, name)}>
    {({ field }) => (
      <RadioFormControl variant="standard" fullWidth>
        <RadioGroup
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
        </RadioGroup>
      </RadioFormControl>
    )}
  </Field>
);

FormInputRadio.propTypes = {
  name: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  validate: PropTypes.func.isRequired,
  validateField: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FormInputRadio;
