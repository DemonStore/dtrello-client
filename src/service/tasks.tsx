import { call, put, takeLatest } from 'redux-saga/effects';

import Ajax from '../helpers/ajax';

export const ACTION_DATA_REQUEST = 'USER_DATA_REQUEST';
export const ACTION_DATA_SUCCESS = 'USER_DATA_SUCCESS';
export const ACTION_DATA_FAILURE = 'USER_DATA_FAILURE';

export interface ColumnData {
    key: number;
    title: string;
    sequence: number;
    tasks: TaskData[];
}

export interface TaskData {
    key: number;
    title: string;
    description: string;
    createdAt: string;
    sequence: number;
}

export interface DataState {
    data?: ColumnData[];
    error?: any;
}

export const actions = {
    data: () => ({
        type: ACTION_DATA_REQUEST
    }),
    dataSuccess: (data: any) => ({
        type: ACTION_DATA_SUCCESS,
        payload: data
    }),
    dataFailure: (error: any) => ({
        type: ACTION_DATA_FAILURE,
        payload: error
    })
};

export function reducer(state: DataState = {}, action: any): DataState {
    switch (action.type) {
        case ACTION_DATA_SUCCESS:
            return {
                ...state,
                data: action.payload
            };
        case ACTION_DATA_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
}

export const service = {
    getData: () => {
        return Ajax.get('/columns').then(response => response.data);
    }
};

export function* saga() {
    yield takeLatest(ACTION_DATA_REQUEST, data);
}

function* data() {
    try {
        const data: ColumnData[] = yield call(service.getData);
        yield put(actions.dataSuccess(data));
    } catch (e) {
        yield put(actions.dataFailure(e));
    }
}
