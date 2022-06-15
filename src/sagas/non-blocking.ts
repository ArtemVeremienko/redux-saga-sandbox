import { createAction, PayloadAction } from '@reduxjs/toolkit'
import { SagaIterator } from 'redux-saga'
import { call, cancel, cancelled, delay, fork, put, take } from 'redux-saga/effects'
import { logout, reject, resetLoading, setLoading, setToken } from '../slices/authSlice'
import * as api from '../utils/api'

interface LoginCreds {
    user: string
    password: string
}

export const $loginRequested = createAction<LoginCreds>('sagas/loginRequested')

function* authorize(user: string, password: string): SagaIterator {
    yield put(setLoading())
    try {
        const token: string = yield call(api.authorize, user, password)
        yield delay(2000)
        // throw new Error('auth error')
        yield put(setToken(token))
        yield call(api.storeItem, token)
    } catch (error) {
        yield put(reject(error))
    } finally {
        yield put(resetLoading())
        if (yield cancelled()) {
            console.log('CANCELLED')
        }
    }
}

export function* loginFlow(): SagaIterator {
    while (true) {
        const { payload: { user, password } }: PayloadAction<LoginCreds> = yield take($loginRequested)
        const task = yield fork(authorize, user, password)
        console.log('LOGIN', task)
        const action = yield take([logout, reject])
        if (logout.match(action)) {
            yield cancel(task)
        }
        console.log('END', action)
        yield call(api.clearItem)
    }
}