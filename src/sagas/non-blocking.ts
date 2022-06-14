import { createAction, PayloadAction } from '@reduxjs/toolkit'
import { SagaIterator } from 'redux-saga'
import { call, delay, put, take } from 'redux-saga/effects'
import { logout, reject, setToken } from '../slices/authSlice'
import * as api from '../utils/api'

interface LoginCreds {
    user: string
    password: string
}

export const $loginRequested = createAction<LoginCreds>('sagas/loginRequested')

function* authorize(user: string, password: string) {
    yield delay(1000)
    try {
        const token: string = yield call(api.authorize, user, password)
        yield put(setToken(token))
        return token
    } catch (error) {
        yield put(reject(error))
    }
}

export function* loginFlow(): SagaIterator {
    while (true) {
        const { payload: { user, password } }: PayloadAction<LoginCreds> = yield take($loginRequested)
        const token = yield call(authorize, user, password)
        console.log('LOGIN', token)
        if (token) {
            yield call(api.storeItem, token)
            const action = yield take(logout)
            console.log('LOGOUT', action)
            yield call(api.clearItem)
        }
    }
}