import React from 'react';
import styled from 'styled-components';
import { size } from 'polished';

import Typography from '@material-ui/core/Typography';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfiedRounded';

const Wrapper = styled.div`
  ${size('100%')}
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Content = styled.div`
  width: 100%;
  max-width: 600px;
`;

const ContentIcon = styled.div`
  width: 100%;
  font-size: 7em;
`;

const NotFound = () => (
  <Wrapper>
    <Content>
      <ContentIcon>
        <SentimentDissatisfiedIcon color="primary" fontSize="inherit" />
      </ContentIcon>
      <Typography variant="h4">
        Sorry, but page not found...
      </Typography>
    </Content>
  </Wrapper>
);

export default NotFound;
