import gql from '../gql';
import { createQuery, createMutation, createSubscription } from '../apollo/utils';

import history from '../router/history';
import storage from '../storage';
import originalClient from '../apollo';

const {
  CHECK_SESSION_EXPIRATION,
  SIGN_OUT,
} = gql;

const checkSessionExpiration = createQuery('checkSessionExpiration', CHECK_SESSION_EXPIRATION);

const signOut = createMutation('signOut', SIGN_OUT, {
  onCompleted() {
    storage.removeTokens();
    originalClient.resetStore();
    history.push('/');
  },
});

export {
  checkSessionExpiration,
  signOut,
};
