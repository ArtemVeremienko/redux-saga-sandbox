import { createSlice } from '@reduxjs/toolkit'
import { useAppSelector } from '../store'

interface Background {
  status: 'idle' | 'loading' | 'error' | 'success'
  data: any
  error: unknown
}

const initialState: Background = {
  status: 'idle',
  data: null,
  error: null,
}

const bgSlice = createSlice({
  name: 'background',
  initialState,
  reducers: {
    requestStarted: (state) => {
      state.status = 'loading'
    },
    requestSuccessed: (state, action) => {
      state.status = 'success'
      state.data = action.payload
    },
    requestFailure: (state, action) => {
      state.status = 'error'
      state.error = action.payload
    },
  },
})

export default bgSlice.reducer
export const { requestStarted, requestSuccessed, requestFailure } =
  bgSlice.actions

export const useBackgroundSyncSelector = () =>
  useAppSelector((state) => state.background)
