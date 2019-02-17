import React, { Component } from 'react';
import styled from 'styled-components';
import { keys } from 'lodash';

import Facebook from './Facebook';
import Google from './Google';

const SocialMediaWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3em;
`;

const SocialMediaNote = styled.p`
  display: inline-flex;
  margin-right: 1em;
`;

class SocialMedia extends Component {
  componentDidUpdate(prevProps) {
    const {
      result,
      setFieldError,
      onSuccess,
      onError,
    } = this.props;

    if (!prevProps.result.error && result.error) {
      const { graphQLErrors } = result.error;
      const { message, extensions } = graphQLErrors[0];

      onError(message);
    }

    if (!prevProps.result.data && result.data) {
      onSuccess(result.data);
    }
  }

  render() {
    const {
      result: { loading },
      mutation,
      note,
    } = this.props;

    return (
      <SocialMediaWrapper>
        <SocialMediaNote>
          {note}
        </SocialMediaNote>
        <Facebook loading={loading} mutation={mutation} />
        <Google loading={loading} mutation={mutation} />
      </SocialMediaWrapper>
    );
  }
}

export default SocialMedia;
