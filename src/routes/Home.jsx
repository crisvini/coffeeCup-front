import { useContext } from "react"

import { UserTokenContext } from "../context/UserTokenContext"

const Home = () => {
    const { userToken, setUserToken } = useContext(UserTokenContext)

    return (
        <div>
            <h1 className='logo-color'>{userToken}</h1>
        </div>
    )
}

export default Home