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
    const {
      name,
      error,
      result,
      setAsyncError,
      clearAsyncError,
    } = this.props;

    if (!prevProps.result.error && result.error) {
      const { graphQLErrors } = result.error;
      const { message, extensions } = graphQLErrors[0];
      const invalidField = get(extensions, 'exception.invalidField');

      if (invalidField) {
        setAsyncError(invalidField, message);
      }
    }

    if (!prevProps.result.data && result.data) {
      this.setAsyncValid(true);
      clearAsyncError(name);
    }

    if (!prevProps.error && error) {
      this.setAsyncValid(false);
      clearAsyncError(name);
    }
  }

  handleBlur = (event) => {
    const {
      name,
      error,
      onBlur,
      mutation,
    } = this.props;
    const { target: { value } } = event;

    if (value && !error) {
      delay(() => mutation({ variables: { field: name, value } }), 1000);
    }
    onBlur(event);
  }

  setAsyncValid = (valid) => {
    this.setState({ asyncValid: valid });
  }

  render() {
    const { asyncValid } = this.state;
    const {
      error,
      asyncError,
      mutation,
      result,
      setAsyncError,
      clearAsyncError,
      ...rest
    } = this.props;
    const { loading } = result;

    return (
      <FormInput
        {...rest}
        error={error || asyncError}
        onBlur={this.handleBlur}
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
