import React, { PureComponent } from 'react';
import { get, delay } from 'lodash';

import InputAdornment from '@material-ui/core/InputAdornment';
import CheckIcon from '@material-ui/icons/CheckRounded';
import CircularProgress from '@material-ui/core/CircularProgress';

import FormInput from './FormInput';

class AsyncFormInput extends PureComponent {
  state = {
    asyncValid: false,
  }

  componentDidUpdate(prevProps) {
    const { result: { data, error } } = this.props;

    if (!prevProps.result.data && data) {
      this.setAsyncValid(true);
    }
    if (!prevProps.result.error && error) {
      this.setAsyncValid(false);
    }
  }

  setAsyncValid = (valid) => {
    this.setState({ asyncValid: valid });
  }

  render() {
    const { asyncValid } = this.state;
    const { result: { loading }, ...rest } = this.props;

    return (
      <FormInput
        {...rest}
        endAdornment={
          (loading || asyncValid)
          && (
            <InputAdornment position="end">
              <Choose>
                <When condition={loading}>
                  <CircularProgress size={18} />
                </When>
                <When condition={!loading && asyncValid}>
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
