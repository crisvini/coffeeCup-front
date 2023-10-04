import { createContext, useState } from "react"

export const UserTokenContext = createContext()

export const UserTokenProvider = ({ children }) => {
    const [userToken, setUserToken] = useState()

    return (
        <UserTokenContext.Provider value={{ userToken, setUserToken }}>
            {children}
        </UserTokenContext.Provider>
    )
}