import { spawn } from "@redux-saga/core/effects"
import { loginFlow } from "./non-blocking"

export function* rootSaga() {
    yield spawn(loginFlow)
}