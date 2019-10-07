import { takeLatest, put, call } from 'redux-saga/effects';
import { push } from "connected-react-router";

import { actions as globalActions } from './global';
import Ajax from '../helpers/ajax';
import storage from '../helpers/storage';

export const KEY_TOKEN = 'token';

export const ACTION_AUTH_REQUEST = 'USER_AUTH_REQUEST';
export const ACTION_AUTH_SUCCESS = 'USER_AUTH_SUCCESS';
export const ACTION_AUTH_FAILURE = 'USER_AUTH_FAILURE';

export const ACTION_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const ACTION_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const ACTION_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';

export const ACTION_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST';
export const ACTION_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const ACTION_LOGOUT_FAILURE = 'USER_LOGOUT_FAILURE';

export interface TokenInfo {
    access_token: string;
}

export interface AuthState {
    authorized?: boolean;
}

export interface LoginData {
    username: string;
    password: string;
}

export function isAuthorized(): boolean {
    const token: TokenInfo = storage.get(KEY_TOKEN);
    return !!(token && token.access_token);
}

export const actions = {
    auth: () => ({
        type: ACTION_AUTH_REQUEST,
    }),
    authSuccess: () => ({
        type: ACTION_AUTH_SUCCESS,
    }),
    authFailure: () => ({
        type: ACTION_AUTH_FAILURE,
    }),
    login: (data: LoginData) => ({
        type: ACTION_LOGIN_REQUEST,
        payload: data,
    }),
    loginSuccess: (response: TokenInfo) => ({
        type: ACTION_LOGIN_SUCCESS,
        payload: response,
    }),
    loginFailure: (error: any) => ({
        type: ACTION_LOGIN_FAILURE,
        payload: error,
    }),
    logout: () => ({
        type: ACTION_LOGOUT_REQUEST,
    }),
    logoutSuccess: () => ({
        type: ACTION_LOGOUT_SUCCESS,
    }),
};

export function reducer(state: AuthState = {}, action: any): AuthState {
    switch (action.type) {
        case ACTION_AUTH_SUCCESS:
            return {
                ...state,
                authorized: true,
            };
        case ACTION_AUTH_FAILURE:
            return {
                ...state,
                authorized: false,
            };
        default:
            return state;
    }
}

export function* saga() {
    // takeEvery:
    // listen for certain actions that are going to be dispatched and take them and run through our worker saga.
    yield takeLatest(ACTION_AUTH_REQUEST, auth);
    yield takeLatest(ACTION_AUTH_SUCCESS, authSuccess);
    yield takeLatest(ACTION_LOGIN_REQUEST, login);
    yield takeLatest(ACTION_LOGIN_SUCCESS, loginSuccess);
    yield takeLatest(ACTION_LOGOUT_REQUEST, logout);
}

export const service = {
    login: (data: LoginData) => {
        return Ajax.post('/auth/login', data).then((response => response.data));
    },
};

function* login(action: any) {
    try {
        const loginData: LoginData = action.payload;
        yield put(globalActions.showLoading('Logging in...'));
        const tokenInfo: TokenInfo = yield call(service.login, {
            ...loginData,
        });
        yield put(actions.loginSuccess(tokenInfo));
        yield put(actions.auth());
        yield put(globalActions.hideLoading());
        yield put(push('/tasks'));
    } catch (e) {
        yield put(globalActions.hideLoading());
    }
}

function loginSuccess(action: any) {
    const tokenInfo = action.payload as TokenInfo;

    storage.set(KEY_TOKEN, tokenInfo);
}

function* auth() {

    if (isAuthorized()) {
        yield put(actions.authSuccess());
    } else {
        yield put(actions.authFailure());
    }
}

function authSuccess() {
    const token: TokenInfo = storage.get(KEY_TOKEN);
    Ajax.setGlobalOptions({
        token: token.access_token
    });
}

function* logout(action: any) {
    Ajax.setGlobalOptions({
        token: null
    });
    storage.remove(KEY_TOKEN);
    yield put(actions.logoutSuccess());
    yield put(push('/login'));
}
