import { spawn } from "@redux-saga/core/effects"
import { loginFlow } from "./non-blocking"
import { watchBgSync } from './task-cancellation'

export function* rootSaga() {
  yield spawn(loginFlow)
  yield spawn(watchBgSync)
}
