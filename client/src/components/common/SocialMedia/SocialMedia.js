import React from 'react';
import PropTypes from 'prop-types';

import Facebook from './Facebook';
import Google from './Google';

import { SocialMediaWrapper, SocialMediaNote } from './styled';
import { mutationResultProps } from '../../propTypes';

const SocialMedia = (props) => {
  const {
    note,
    mutation,
    result: { loading },
  } = props;

  return (
    <SocialMediaWrapper>
      <SocialMediaNote>
        {note}
      </SocialMediaNote>
      <Facebook loading={loading} mutation={mutation} />
      <Google loading={loading} mutation={mutation} />
    </SocialMediaWrapper>
  );
};

SocialMedia.defaultProps = {
  note: '',
};
SocialMedia.propTypes = {
  mutation: PropTypes.func.isRequired,
  result: PropTypes.shape(mutationResultProps).isRequired,
  note: PropTypes.string,
};

export default SocialMedia;
