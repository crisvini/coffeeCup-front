import { useState } from 'react'

const useHttpRequest = () => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)

    const sendRequest = async (method, url, body = null) => {
        setLoading(true)
        const headers = {
            'Content-Type': 'application/json',
        }

        const config = {
            method,
            headers,
            body: body ? JSON.stringify(body) : null,
        }

        const response = await fetch(url, config)

        if (!response.ok) {
            setLoading(false)
            return false
        }

        const responseData = await response.json()
        setData(responseData)
        setLoading(false)

        return responseData
    }

    return {
        data,
        loading,
        sendRequest,
    }
}

export default useHttpRequest