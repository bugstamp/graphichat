import { combineReducers } from 'redux-immutable';
import { reducer as formReducer } from 'redux-form/immutable';
// import { createSelector } from 'reselect';
// import { fromJS } from 'immutable';

export default combineReducers({
  form: formReducer,
});
