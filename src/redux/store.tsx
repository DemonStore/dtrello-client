import { applyMiddleware, createStore, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from "connected-react-router";

import rootReducer from './reducer';
import rootSaga from './saga';
import history from '../redux/history';

const appSagaMiddleware = createSagaMiddleware();
const appRouterMiddleware = routerMiddleware(history);
const middlewares = [appRouterMiddleware, appSagaMiddleware];

const store: Store<any, any> = createStore(
    rootReducer,
    applyMiddleware(...middlewares),
);

// then run the saga
appSagaMiddleware.run(rootSaga);

export default store;
