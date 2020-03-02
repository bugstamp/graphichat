import styled from 'styled-components';
import { position } from 'polished';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import MaterialRadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';

export const FormWrapper = styled.form`
  width: 100%;
`;

export const FormInputWrapper = styled(FormControl)`
  && {
    position: relative;
    padding-bottom: 1.5em;
  }
`;

export const FormInputError = styled(FormHelperText)`
  && {
    ${position('absolute', null, 0, '0.5em', 0)}
  }
`;

export const SubmitButton = styled(Button)`
  && {
    position: relative;
    margin-top: 1em;
  }
`;

export const RadioFormControl = styled(FormControl)`
  && {
    position: relative;
    margin-bottom: 1.5em;
  }
`;

export const RadioGroup = styled(MaterialRadioGroup)`
  && {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
  }
`;
