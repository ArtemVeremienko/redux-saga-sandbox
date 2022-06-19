import { createAction } from '@reduxjs/toolkit'
import { SagaIterator } from 'redux-saga'
import {
  call,
  cancelled,
  delay,
  fork,
  put,
  take,
  cancel,
} from 'redux-saga/effects'
import {
  requestFailure,
  requestStarted,
  requestSuccessed,
} from '../slices/bgSlice'
import * as api from '../utils/api'

export const $startBackgroundSync = createAction('sagas/startBackgroundSync')
export const $stopBackgroundSync = createAction('sagas/stopBackgroundSync')

function* bgSync(): SagaIterator {
  try {
    while (true) {
      yield put(requestStarted())
      const result: string = yield call(api.authorize, 'test', '123')
      yield put(requestSuccessed(result))
      yield delay(5000)
    }
  } finally {
    if (yield cancelled()) {
      yield put(requestFailure('cancelled'))
    }
  }
}

export function* watchBgSync(): SagaIterator {
  while (yield take($startBackgroundSync)) {
    const bgSyncTask = yield fork(bgSync)
    yield take($stopBackgroundSync)
    yield cancel(bgSyncTask)
  }
}
