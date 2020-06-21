import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import WarningIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';

const Wrapper = styled.p`
  display: inline-flex;
  align-items: center;
  color: #fff;

  span {
    margin-left: 1em;
  }
`;

const MessageIcon = ({ type }) => (
  <Choose>
    <When condition={type === 'warning'}>
      <WarningIcon />
    </When>
    <When condition={type === 'error'}>
      <ErrorIcon />
    </When>
    <Otherwise>{null}</Otherwise>
  </Choose>
);

MessageIcon.propTypes = {
  type: PropTypes.oneOf(['warning', 'error', 'success']).isRequired,
};

const NotificationMessage = ({ type, message }) => (
  <Wrapper>
    <MessageIcon type={type} />
    <span>
      {message}
    </span>
  </Wrapper>
);

NotificationMessage.propTypes = {
  type: PropTypes.oneOf(['warning', 'error', 'success']).isRequired,
  message: PropTypes.string.isRequired,
};

export default NotificationMessage;
