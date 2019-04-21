import { adopt } from 'react-adopt';

import { createMutation, createQuery } from '../../apollo/utils';
import { SEARCH_USERS } from '../../actions/authActions';

const searchUsers = createQuery('searchUsers', SEARCH_USERS);

const SearchDialogContainer = adopt({
  searchUsers,
});

export default SearchDialogContainer;
