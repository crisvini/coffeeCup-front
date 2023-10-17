import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"
import useHttpRequest from "./useHttpRequest"

const useLogout = () => {
    const token = sessionStorage.getItem('user_token')

    const navigate = useNavigate()

    const location = useLocation()
    const { loading, sendRequest } = useHttpRequest()

    const logout = () => {
        sendRequest({ method: 'POST', url: 'http://localhost/api/logout', auth: token })
            .then((responseData) => {
                sessionStorage.clear()
                if (location.pathname !== '/') navigate('/')
            })
    }

    return { logout }
}

export default useLogout