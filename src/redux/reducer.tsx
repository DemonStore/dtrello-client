import { combineReducers } from 'redux';
import { connectRouter } from "connected-react-router";
import { History } from 'history';

import { reducer as global } from '../service/global';
import { reducer as auth } from '../service/auth';
import { reducer as tasks } from '../service/tasks';
import history from './history';

const createRootReducer = (his: History<any>) =>
    combineReducers({
        router: connectRouter(his),
        global,
        auth,
        tasks
    });

const rootReducer = createRootReducer(history);

export default rootReducer;
