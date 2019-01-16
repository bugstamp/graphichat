import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from '../reducers';
import { rootSaga } from '../actions';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  sagaMiddleware,
];

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middlewares)),
);

sagaMiddleware.run(rootSaga);

export default store;
