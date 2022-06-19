import { useAppDispatch } from './store'
import { $loginRequested } from './sagas/non-blocking'
import { logout, useAuthSelector } from './slices/authSlice'
import {
  $startBackgroundSync,
  $stopBackgroundSync,
} from './sagas/task-cancellation'
import { useBackgroundSyncSelector } from './slices/bgSlice'

function App() {
  const dispatch = useAppDispatch()
  const { status, data, error } = useBackgroundSyncSelector()

  return (
    <div>
      <button onClick={() => dispatch($startBackgroundSync())}>Login</button>
      <button onClick={() => dispatch($stopBackgroundSync())}>Logout</button>
      <p>{status}...</p>
      <pre>Data: {JSON.stringify(data, null, 2)}</pre>
      <p style={{ color: 'red' }}>Error: {JSON.stringify(error)}</p>
    </div>
  )
}

export default App
