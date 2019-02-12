import React, { PureComponent } from 'react';
import { get } from 'lodash';

import InputAdornment from '@material-ui/core/InputAdornment';
import CheckIcon from '@material-ui/icons/CheckRounded';
import CircularProgress from '@material-ui/core/CircularProgress';

import FormInput from './FormInput';

class AsyncFormInput extends PureComponent {
  componentDidUpdate(prevProps) {
    const { result: { error, data }, name, setAsyncError, clearAsyncError } = this.props;

    if (!prevProps.result.error && error) {
      const { graphQLErrors } = error;
      const { message, extensions } = graphQLErrors[0];
      const invalidField = get(extensions, 'exception.invalidField');

      if (invalidField) {
        setAsyncError(invalidField, message);
      }
    }

    if (!prevProps.result.data && data) {
      clearAsyncError(data.field);
    }
  }

  handleBlur = (event) => {
    const { name, error, onBlur, mutation } = this.props;
    const { target: { value } } = event;

    if (value && !error) {
      mutation({ variables: { field: name, value } });
    }
    onBlur(event);
  }

  render() {
    const {
      mutation,
      result,
      setAsyncError,
      clearAsyncError,
      error,
      asyncError,
      ...rest
    } = this.props;
    const { loading, data } = result;

    return (
      <FormInput
        {...rest}
        error={error || asyncError}
        onBlur={this.handleBlur}
        endAdornment={
          (loading || data) && (
            <InputAdornment position="end">
              <Choose>
                <When condition={loading}>
                  <CircularProgress size={18} />
                </When>
                <When condition={!loading && data}>
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
