import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { map } from 'lodash';

import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { RadioFormControl, RadioGroup } from './styled';

const FormInputRadio = ({
  name,
  values,
  validate,
  validateField,
  onChange,
}) => {
  function handleValidate(value) {
    validate(value, name);
  }

  function handleChange(e) {
    validateField(name);

    onChange(e);
  }

  return (
    <Field name={name} validate={handleValidate}>
      {({ field }) => (
        <RadioFormControl variant="standard" fullWidth>
          <RadioGroup
            {...field}
            name={name}
            onChange={handleChange}
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
};

FormInputRadio.propTypes = {
  name: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  validate: PropTypes.func.isRequired,
  validateField: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default memo(FormInputRadio);
