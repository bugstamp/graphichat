import React, { PureComponent } from 'react';

import InputAdornment from '@material-ui/core/InputAdornment';
import CheckIcon from '@material-ui/icons/CheckRounded';
import CircularProgress from '@material-ui/core/CircularProgress';

import FormInput from './FormInput';

class AsyncFormInput extends PureComponent {
  handleBlur = (event) => {
    const { name, onBlur, mutation } = this.props;
    const { target: { value } } = event;

    onBlur(event);
    mutation({ variables: { field: name, value } });
  }

  render() {
    const {
      asyncProcessing,
      asyncResult,
      mutation,
      ...rest
    } = this.props;

    return (
      <FormInput
        {...rest}
        onBlur={this.handleBlur}
        endAdornment={
          (asyncProcessing || asyncResult) && (
            <InputAdornment position="end">
              <Choose>
                <When condition={asyncProcessing}>
                  <CircularProgress size={18} />
                </When>
                <When condition={!asyncProcessing && asyncResult}>
                  <CheckIcon color="action" />
                </When>
                <Otherwise>{null}</Otherwise>
              </Choose>
            </InputAdornment>
          )
        }
      />
    );
  }
}

export default AsyncFormInput;
