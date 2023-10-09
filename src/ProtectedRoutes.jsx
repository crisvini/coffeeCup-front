import { Outlet } from 'react-router-dom'

import { useNavigate } from 'react-router-dom'

function ProtectedRoutes() {
    const navigate = useNavigate()

    if (!sessionStorage.getItem('login_token')) navigate('/')

    return (
        <div className='App'>
            <Outlet />
        </div>
    )
}

export default ProtectedRoutes
