import { useAppDispatch } from './store'
import { $loginRequested } from './sagas/non-blocking'
import { logout, useAuthSelector } from './slices/authSlice'

function App() {
  const dispatch = useAppDispatch()
  const { token } = useAuthSelector()

  return (
    <div className="App">
      <p>Token: {token}</p>
      <button onClick={() => dispatch($loginRequested({ user: 'Jhon', password: '123' }))}>Login</button>
      <button onClick={() => dispatch(logout())}>Logout</button>
    </div>
  )
}

export default App
