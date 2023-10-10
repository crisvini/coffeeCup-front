// import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import useHttpRequest from "./useHttpRequest"

const useLogout = () => {
    const token = sessionStorage.getItem('user_token')

    const location = useLocation()
    const { loading, sendRequest } = useHttpRequest()

    const logout = () => {
        sendRequest({ method: 'POST', url: 'http://localhost/api/logout', auth: token })
            .then((responseData) => {
                sessionStorage.removeItem('user_token')
                if (location.pathname !== '/') navigate('/')
            })
    }

    return {logout}
}

export default useLogout