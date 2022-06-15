import { useAppDispatch } from './store'
import { $loginRequested } from './sagas/non-blocking'
import { logout, useAuthSelector } from './slices/authSlice'

function App() {
  const dispatch = useAppDispatch()
  const { token, error, isLoading } = useAuthSelector()

  return (
    <div>
      <h1>Token: {token}</h1>
      <button onClick={() => dispatch($loginRequested({ user: 'Jhon', password: '123' }))}>Login</button>
      <button onClick={() => dispatch(logout())}>Logout</button>
      {isLoading && <p>Loading...</p>}
      {Boolean(error) && <p style={{ color: 'red' }}>ERROR!</p>}
    </div>
  )
}

export default App
