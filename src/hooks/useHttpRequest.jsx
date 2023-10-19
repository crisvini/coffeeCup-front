import { useState } from 'react'

const useHttpRequest = () => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)

    const sendRequest = async ({ method, url, body = null, descOrder }) => {
        setLoading(true)
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('user_token') ? ('Bearer ' + sessionStorage.getItem('user_token')) : null
        }

        const config = {
            method,
            headers,
            body: body ? JSON.stringify(body) : null
        }

        const response = await fetch(url, config)

        if (!response.ok) {
            setLoading(false)
            return false
        }

        const responseData = await response.json()
        setData(descOrder === true ? responseData.reverse() : responseData)
        setLoading(false)

        return responseData
    }

    return {
        data,
        loading,
        sendRequest
    }
}

export default useHttpRequest