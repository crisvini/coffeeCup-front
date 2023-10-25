import { useParams, useNavigate, Link, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"

import useHttpRequest from "../hooks/useHttpRequest"
import useFormatDate from "../hooks/useFormatDate"
import useFormatEmail from "../hooks/useFormatEmail"
import useVerifyUser from "../hooks/useVerifyUser"

import PageTitle from "../components/PageTitle"
import LoadingOverlay from '../components/LoadingOverlay'
import Header from "../components/Header"
import Back from "../components/Back"

const Profile = () => {
    const { id } = useParams()

    const navigate = useNavigate()
    const location = useLocation()
    const { loading, sendRequest } = useHttpRequest()
    const { formatDate } = useFormatDate()
    const { formatEmail } = useFormatEmail()

    const [user, setUser] = useState([])

    useEffect(() => {
        sendRequest({ method: 'GET', url: ('http://localhost/api/users/' + id) })
            .then((responseData) => {
                setUser(responseData)
            })
    }, [])

    return (
        <div className="background-quaternary">
            <PageTitle title={user.email ? formatEmail(user.email) : "Loading"} />
            <Header />

            <main className="container h-100 mt-1">
                <Back route='/home' text='Home' />
                <div className="row background-secondary rounded-lg-3 py-2 px-2 mt-2">
                    <div className="col-8 col-lg-8 px-lg-0">
                        <h1 className="additional-logo-color mb-0">{user.name ? user.name : 'Loading..'}</h1>
                        <span className="logo-color">{user.email ? ('@' + formatEmail(user.email)) : 'Loading..'}</span>
                    </div>
                    <div className="col-4 col-lg-4 px-lg-0 text-lg-end">
                        <div className="row">
                            <div className="col-12">
                                <span className="color-quaternary fs-10">{user.created_at ? ('member since ' + formatDate(user.created_at, true)) : 'Loading..'}</span>
                            </div>
                            <div className="col-12">
                                <span className="color-quaternary fs-10">{user.interactions ? (user.interactions + ' interactions') : 'Loading..'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Profile