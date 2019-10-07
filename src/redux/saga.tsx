import { all } from 'redux-saga/effects';

import { saga as authSaga } from '../service/auth';
import { saga as tasksSaga } from '../service/tasks';

export default function* rootSaga() {
    yield all([authSaga(), tasksSaga()]);
}
