import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.min.css'

import { Navigate, Outlet, useLocation } from 'react-router-dom'

function App() {
  const location = useLocation()
  if (location.pathname !== '/' && location.pathname !== '/signup' && !sessionStorage.getItem('user_token'))
    return <Navigate to="/" />

  return (
    <div className='App'>
      <Outlet />
    </div>
  )
}

export default App
