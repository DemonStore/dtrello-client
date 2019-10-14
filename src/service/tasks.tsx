import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';

import Ajax from '../helpers/ajax';

export const ACTION_DATA_REQUEST = 'USER_DATA_REQUEST';
export const ACTION_DATA_SUCCESS = 'USER_DATA_SUCCESS';
export const ACTION_DATA_FAILURE = 'USER_DATA_FAILURE';

export const ACTION_COLUMN_ADD_REQUEST = 'USER_COLUMN_ADD_REQUEST';
export const ACTION_COLUMN_ADD_SUCCESS = 'USER_COLUMN_ADD_SUCCESS';
export const ACTION_COLUMN_ADD_FAILURE = 'USER_COLUMN_ADD_FAILURE';

export const ACTION_COLUMN_EDIT_REQUEST = 'USER_COLUMN_EDIT_REQUEST';
export const ACTION_COLUMN_EDIT_SUCCESS = 'USER_COLUMN_EDIT_SUCCESS';
export const ACTION_COLUMN_EDIT_FAILURE = 'USER_COLUMN_EDIT_FAILURE';

export const ACTION_COLUMN_DELETE_REQUEST = 'USER_COLUMN_DELETE_REQUEST';
export const ACTION_COLUMN_DELETE_SUCCESS = 'USER_COLUMN_DELETE_SUCCESS';
export const ACTION_COLUMN_DELETE_FAILURE = 'USER_COLUMN_DELETE_FAILURE';

export const ACTION_TASK_ADD_REQUEST = 'USER_TASK_ADD_REQUEST';
export const ACTION_TASK_ADD_SUCCESS = 'USER_TASK_ADD_SUCCESS';
export const ACTION_TASK_ADD_FAILURE = 'USER_TASK_ADD_FAILURE';

export const ACTION_TASK_DATA_REQUEST = 'USER_TASK_DATA_REQUEST';
export const ACTION_TASK_DATA_SUCCESS = 'USER_TASK_DATA_SUCCESS';
export const ACTION_TASK_DATA_FAILURE = 'USER_TASK_DATA_FAILURE';

export const ACTION_TASK_EDIT_REQUEST = 'USER_TASK_EDIT_REQUEST';
export const ACTION_TASK_EDIT_SUCCESS = 'USER_TASK_EDIT_SUCCESS';
export const ACTION_TASK_EDIT_FAILURE = 'USER_TASK_EDIT_FAILURE';

export const ACTION_TASK_DELETE_REQUEST = 'USER_TASK_DELETE_REQUEST';
export const ACTION_TASK_DELETE_SUCCESS = 'USER_TASK_DELETE_SUCCESS';
export const ACTION_TASK_DELETE_FAILURE = 'USER_TASK_DELETE_FAILURE';

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
    task?: TaskData;
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
    }),
    columnAdd: (sequence: number) => ({
        type: ACTION_COLUMN_ADD_REQUEST,
        payload: sequence
    }),
    columnAddSuccess: () => ({
        type: ACTION_COLUMN_ADD_SUCCESS
    }),
    columnAddFailure: (error: any) => ({
        type: ACTION_COLUMN_ADD_FAILURE,
        payload: error
    }),
    columnEdit: (columnId: number, columnUpdate: any) => ({
        type: ACTION_COLUMN_EDIT_REQUEST,
        payload: {columnId, columnUpdate}
    }),
    columnEditSuccess: () => ({
        type: ACTION_COLUMN_EDIT_SUCCESS
    }),
    columnEditFailure: (error: any) => ({
        type: ACTION_COLUMN_EDIT_FAILURE,
        payload: error
    }),
    columnDelete: (columnId: number) => ({
        type: ACTION_COLUMN_DELETE_REQUEST,
        payload: columnId
    }),
    columnDeleteSuccess: () => ({
        type: ACTION_COLUMN_DELETE_SUCCESS
    }),
    columnDeleteFailure: (error: any) => ({
        type: ACTION_COLUMN_DELETE_FAILURE,
        payload: error
    }),
    taskAdd: (columnId: number, sequence: number) => ({
        type: ACTION_TASK_ADD_REQUEST,
        payload: { columnId, sequence }
    }),
    taskAddSuccess: () => ({
        type: ACTION_TASK_ADD_SUCCESS
    }),
    taskAddFailure: (error: any) => ({
        type: ACTION_TASK_ADD_FAILURE,
        payload: error
    }),
    taskData: (taskId: number) => ({
        type: ACTION_TASK_DATA_REQUEST,
        payload: taskId
    }),
    taskDataSuccess: (task: TaskData) => ({
        type: ACTION_TASK_DATA_SUCCESS,
        payload: task
    }),
    taskDataFailure: (error: any) => ({
        type: ACTION_TASK_DATA_FAILURE,
        payload: error
    }),
    taskEdit: (taskId: number, taskUpdate: any) => ({
        type: ACTION_TASK_EDIT_REQUEST,
        payload: { taskId, taskUpdate }
    }),
    taskEditSuccess: () => ({
        type: ACTION_TASK_EDIT_SUCCESS
    }),
    taskEditFailure: (error: any) => ({
        type: ACTION_TASK_EDIT_FAILURE,
        payload: error
    }),
    taskDelete: (taskId: number) => ({
        type: ACTION_TASK_DELETE_REQUEST,
        payload: taskId
    }),
    taskDeleteSuccess: () => ({
        type: ACTION_TASK_DELETE_SUCCESS
    }),
    taskDeleteFailure: (error: any) => ({
        type: ACTION_TASK_DELETE_SUCCESS,
        payload: error
    }),
};

export function reducer(state: DataState = {}, action: any): DataState {
    switch (action.type) {
        case ACTION_DATA_SUCCESS:
            return {
                ...state,
                data: action.payload
            };
        case ACTION_TASK_DATA_REQUEST:
            return {
                ...state,
                task: undefined
            };
        case ACTION_TASK_DATA_SUCCESS:
            return {
                ...state,
                task: action.payload
            };
        default:
            return state;
    }
}

export const service = {
    getData: () => {
        return Ajax.get('/columns').then(response => response.data);
    },
    addColumn: (sequence: number) => {
        return Ajax.post('/columns', {
            title: 'New Column',
            sequence
        }).then(response => response.data)
    },
    editColumn: (columnId: number, columnUpdate: any) => {
        return Ajax.patch(`/columns/${columnId}`, columnUpdate).then(response => response.data);
    },
    deleteColumn: (columnId: number) => {
        return Ajax.remove(`/columns/${columnId}`).then(response => response.data)

    },
    addTask: (columnId: number, sequence: number) => {
        return Ajax.post('/tasks', {
            title: 'New Task',
            column: columnId,
            description: 'Description placeholder',
            sequence
        }).then(response => response.data)
    },
    getTask: (taskId: number) => {
        return Ajax.get(`/tasks/${taskId}`).then(response => response.data);
    },
    editTask: (taskId: number, taskUpdate: any) => {
        return Ajax.patch(`/tasks/${taskId}`, taskUpdate).then(response => response.data);
    },
    deleteTask: (taskId: number) => {
        return Ajax.remove(`/tasks/${taskId}`).then(response => response.data)
    }
};

export function* saga() {
    yield takeLatest(ACTION_DATA_REQUEST, data);
    yield takeLatest(ACTION_TASK_DATA_REQUEST, taskData);
    yield takeEvery(ACTION_COLUMN_ADD_REQUEST, columnAdd);
    yield takeEvery(ACTION_COLUMN_ADD_SUCCESS, columnAddSuccess);
    yield takeEvery(ACTION_COLUMN_EDIT_REQUEST, columnEdit);
    yield takeEvery(ACTION_COLUMN_EDIT_SUCCESS, columnEditSuccess);
    yield takeEvery(ACTION_COLUMN_DELETE_REQUEST, columnDelete);
    yield takeEvery(ACTION_COLUMN_DELETE_SUCCESS, columnDeleteSuccess);
    yield takeEvery(ACTION_TASK_ADD_REQUEST, taskAdd);
    yield takeEvery(ACTION_TASK_ADD_SUCCESS, taskAddSuccess);
    yield takeEvery(ACTION_TASK_EDIT_REQUEST, taskEdit);
    yield takeEvery(ACTION_TASK_EDIT_SUCCESS, taskEditSuccess);
    yield takeEvery(ACTION_TASK_DELETE_REQUEST, taskDelete);
    yield takeEvery(ACTION_TASK_DELETE_SUCCESS, taskDeleteSuccess);
}

function* data() {
    try {
        const data: ColumnData[] = yield call(service.getData);
        yield put(actions.dataSuccess(data));
    } catch (e) {
        yield put(actions.dataFailure(e));
    }
}

function* taskData(action: any) {
    try {
        const taskId = action.payload;
        const data: TaskData = yield call(service.getTask, taskId);
        yield put(actions.taskDataSuccess(data));
    } catch (e) {
        yield put(actions.taskDataFailure(e));
    }
}

function* columnAdd(action: any) {
    try {
        const sequence = action.payload;
        yield call(service.addColumn, sequence);
        yield put(actions.columnAddSuccess());
    } catch (e) {
        yield put(actions.columnAddFailure(e));
    }
}

function* columnAddSuccess() {
    yield put(actions.data());
}

function* columnEdit(action: any) {
    try {
        const {columnId, columnUpdate} = action.payload;
        yield call(service.editColumn, columnId, columnUpdate);
        yield put(actions.columnEditSuccess());
    } catch (e) {
        yield put(actions.columnEditFailure(e));
    }
}

function* columnEditSuccess() {
    yield put(actions.data());
}

function* columnDelete(action: any) {
    try {
        const columnId = action.payload;
        yield call(service.deleteColumn, columnId);
        yield put(actions.columnDeleteSuccess());
    } catch (e) {
        yield put(actions.columnDeleteFailure(e));
    }
}

function* columnDeleteSuccess() {
    yield put(actions.data());
}

function* taskAdd(action: any) {
    try {
        const columnId = action.payload.columnId;
        const sequence = action.payload.sequence;
        yield call(service.addTask, columnId, sequence);
        yield put(actions.taskAddSuccess());
    } catch (e) {
        yield put(actions.taskAddFailure(e));
    }
}

function* taskAddSuccess() {
    yield put(actions.data());
}

function* taskEdit(action: any) {
    try {
        const taskId = action.payload.taskId;
        const taskUpdate = action.payload.taskUpdate;
        yield call(service.editTask, taskId, taskUpdate);
        yield put(actions.taskEditSuccess());
    } catch (e) {
        yield put(actions.taskEditFailure(e));
    }
}

function* taskEditSuccess() {
    yield put(actions.data());
}

function* taskDelete(action: any) {
    try {
        const taskId = action.payload;
        yield call(service.deleteTask, taskId);
        yield put(actions.taskDeleteSuccess());
    } catch (e) {
        yield put(actions.taskDeleteFailure(e));
    }
}

function* taskDeleteSuccess() {
    yield put(actions.data());
}
