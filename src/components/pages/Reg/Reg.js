import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import queryString from 'query-string';
import styled, { keyframes } from 'styled-components';
import { backgrounds } from 'polished';
import { fadeInRight, fadeInLeft } from 'react-animations';
import { map } from 'lodash';

import Typography from '@material-ui/core/Typography';

import RegContainer from '../../containers/RegContainer';
import RegForm from './RegForm';
import BrandTitle from '../Login/BrandTitle';

import withNotification from '../../common/HOC/withNotification';
import { checkToken } from '../../../router/PrivateRoute';
import storage from '../../../storage';

import bgImage from '../../../assets/images/reg-bg__1920_95.jpg';

const fadeInRightAnimation = keyframes`${fadeInRight}`;
const fadeInLeftAnimation = keyframes`${fadeInLeft}`;

const isEven = (n) => {
  return n % 2 === 0;
};

const Wrapper = styled(Grid)`
  flex: 1 auto;
  display: flex;
  ${backgrounds(`url(${bgImage})`, 'center no-repeat')}
  background-size: cover;
`;

const Presentation = styled.div`
  flex: 1 auto;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
`;

const SubTitle = styled.div`
  color: #fff;
  text-align: center;
  opacity: 0;

  h4 {
    display: inline;
    font-weight: bold;
  }
`;

const SubTitleWord = styled(Typography)`
  && {
    animation: 1s ${({ even }) => even === 'true' ? fadeInLeftAnimation : fadeInRightAnimation};
  }
`;

class SignUp extends Component {
  state = {
    activeStep: 0,
    completed: false,
  }

  steps = [
    'Create your account',
    'Tell us about yourself',
  ];

  async componentDidMount() {
    const { location: { search }, history } = this.props;
    const { token } = queryString.parse(search);

    if (token) {
      try {
        const { regStatus } = await checkToken(token, true);

        if (regStatus) {
          this.setActiveStep(1);
        } else {
          history.push('/reg');
        }
      } catch (e) {
        throw e;
      }
    }
  }

  handleSuccess = ({ token, refreshToken }) => {
    if (token && refreshToken) {
      const { history } = this.props;

      storage.setTokens(token, refreshToken);
      history.push('/');
    } else {
      this.setState({ completed: true });
    }
  }

  handleError = (e) => {
    if (e.graphQLErrors) {
      const { toggleNotification } = this.props;
      const { graphQLErrors } = e;
      const { message } = graphQLErrors[0];

      toggleNotification(message);
    }
  }

  setActiveStep = (step) => {
    this.setState(() => ({ activeStep: step }));
  }

  render() {
    const { activeStep, completed } = this.state;

    return (
      <RegContainer
        signUpProps={{
          onCompleted: ({ signUp }) => this.handleSuccess(signUp),
        }}
        signUpCompletionProps={{
          onCompleted: ({ signUpCompletion }) => this.handleSuccess(signUpCompletion),
        }}
        signUpBySocialProps={{
          onCompleted: ({ signUpBySocial }) => this.handleSuccess(signUpBySocial),
          onError: this.handleError,
        }}
      >
        {({
          signUpAsyncValidationUsername,
          signUpAsyncValidationEmail,
          signUp,
          signUpCompletion,
          signUpBySocial,
        }) => (
          <Wrapper container>
            <Presentation>
              <BrandTitle />
              <SubTitle>
                {
                  map(['Simple', 'Fun', 'Fast', 'Useful', 'Powerful'], (word, index) => {
                    const even = isEven(index + 1);

                    return (
                      <SubTitleWord
                        key={index + 1}
                        variant="h4"
                        align="center"
                        even={`${even}`}
                      >
                        {word}
                      </SubTitleWord>
                    );
                  })
                }
              </SubTitle>
            </Presentation>
            <RegForm
              steps={this.steps}
              activeStep={activeStep}
              completed={completed}
              signUpAsyncValidationUsername={signUpAsyncValidationUsername}
              signUpAsyncValidationEmail={signUpAsyncValidationEmail}
              signUp={signUp}
              signUpCompletion={signUpCompletion}
              signUpBySocial={signUpBySocial}
            />
          </Wrapper>
        )}
      </RegContainer>
    );
  }
}

SignUp.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  toggleNotification: PropTypes.func.isRequired,
};

export default withNotification(SignUp);
