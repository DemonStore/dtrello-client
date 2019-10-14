import { applyMiddleware, compose, createStore, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from "connected-react-router";

import rootReducer from './reducer';
import rootSaga from './saga';
import history from '../redux/history';

const composeEnhancer: typeof compose =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const appSagaMiddleware = createSagaMiddleware();
const appRouterMiddleware = routerMiddleware(history);
const middlewares = [appRouterMiddleware, appSagaMiddleware];

const store: Store<any, any> = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(...middlewares)),
);

// then run the saga
appSagaMiddleware.run(rootSaga);

export default store;
