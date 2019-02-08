import React from 'react';
import styled from 'styled-components';

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

const SocialMedia = ({ loading, mutation }) => {
  return (
    <SocialMediaWrapper>
      <SocialMediaNote>
        {'Sign in with social media:'}
      </SocialMediaNote>
      <Facebook loading={loading} mutation={mutation} />
      <Google loading={loading} mutation={mutation} />
    </SocialMediaWrapper>
  );
};

export default SocialMedia;
