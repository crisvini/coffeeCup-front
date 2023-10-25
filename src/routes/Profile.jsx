import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import useHttpRequest from "../hooks/useHttpRequest"
import useFormatDate from "../hooks/useFormatDate"
import useFormatEmail from "../hooks/useFormatEmail"
import useVerifyUser from "../hooks/useVerifyUser"

import PageTitle from "../components/PageTitle"
import LoadingOverlay from '../components/LoadingOverlay'
import Header from "../components/Header"
import Back from "../components/Back"
import Discussion from "../components/Discussion"

const Profile = () => {
    const { id } = useParams()

    const [user, setUser] = useState([])
    const [discussions, setDiscussions] = useState([])

    const firstPage = 1
    const [currentPage, setCurrentPage] = useState(firstPage)
    const [baseUrl, setBaseUrl] = useState('http://localhost/api/discussions/filtered-by-user/' + id)
    const [urlWithPageParameter, setUrlWithPageParameter] = useState(baseUrl + '?page=' + firstPage)
    const [lastPage, setLastPage] = useState('')
    const [totalDiscussions, setTotalDiscussions] = useState('')

    const { loading, sendRequest } = useHttpRequest()
    const { formatDate } = useFormatDate()
    const { formatEmail } = useFormatEmail()
    const { verifyUser } = useVerifyUser()

    useEffect(() => {
        sendRequest({ method: 'GET', url: ('http://localhost/api/users/' + id) })
            .then((responseData) => {
                setUser(responseData)
                changeUrl()
            })
    }, [id])

    const changeUrl = () => {
        setBaseUrl('http://localhost/api/discussions/filtered-by-user/' + id)
        setUrlWithPageParameter('http://localhost/api/discussions/filtered-by-user/' + id + '?page=' + firstPage)
    }

    useEffect(() => {
        sendRequest({ method: 'GET', url: urlWithPageParameter })
            .then((responseData) => {
                setLastPage(responseData.last_page)
                setTotalDiscussions(responseData.total)
                setDiscussions(responseData.data)
            })

    }, [urlWithPageParameter])

    const handlePageChange = (page) => {
        if (page < firstPage) page = 1
        if (page > lastPage) page = lastPage

        setCurrentPage(page)
        setUrlWithPageParameter(baseUrl + '?page=' + page)
    }

    return (
        <div className="background-quaternary">
            <PageTitle title={user.email ? formatEmail(user.email) : "Loading"} />
            <Header />

            <main className="container h-100 mt-1">
                <Back route='/home' text='Home' />
                <div className="row background-secondary rounded-lg-3 py-2 px-2 mt-2 mb-4">
                    <div className="col-12 col-lg-8 px-lg-0">
                        <h1 className="additional-logo-color mb-0">{user.name ? user.name : 'Loading..'}</h1>
                        <span className="logo-color">{user.email ? ('@' + formatEmail(user.email)) : 'Loading..'}</span>
                    </div>
                    <div className="col-12 col-lg-4 px-lg-0 text-lg-end">
                        <div className="row">
                            <div className="col-12">
                                <span className="color-quaternary fs-10">{user.created_at ? ('member since ' + formatDate(user.created_at, true)) : 'Loading..'}</span>
                            </div>
                            <div className="col-12">
                                <span className="color-quaternary fs-10">{user.interactions ? (user.interactions + ' interactions') : 'Loading..'}</span>
                            </div>
                        </div>
                    </div>
                    {
                        !verifyUser({ userId: id }) &&
                        <div className="col-12 col-lg-2 px-lg-0 text-lg-start mt-3">
                            <button className="btn btn-sm primary-logo-button-color w-100">Follow</button>
                        </div>
                    }
                </div>

                {discussions.map((item, index) => (
                    <Discussion key={index} data={item} />
                ))}

                <div className="row mt-3">
                    <div className="ms-auto col-12 col-lg-4 px-lg-0 text-center text-lg-end">
                        <div className="btn-group w-100">
                            <button className="btn btn-sm quaternary-logo-button-color" onClick={() => handlePageChange(1)}><i className="bi bi-chevron-double-left"></i>&nbsp;First</button>
                            <button className="btn btn-sm primary-logo-button-color" onClick={() => handlePageChange(currentPage - 1)}><i className="bi bi-chevron-left"></i>&nbsp;Previous</button>
                            <button className="btn btn-sm primary-logo-button-color" onClick={() => handlePageChange(currentPage + 1)}>Next&nbsp;<i className="bi bi-chevron-right"></i></button>
                            <button className="btn btn-sm quaternary-logo-button-color" onClick={() => handlePageChange(lastPage)}>Last&nbsp;<i className="bi bi-chevron-double-right"></i></button>
                        </div>
                        <div className="text-end">
                            <span className="color-primary fs-10">Page {currentPage} of {lastPage}</span>
                        </div>
                        <div className="text-end">
                            <span className="color-primary fs-10">Total of discussions: {totalDiscussions}</span>
                        </div>
                    </div>
                </div>

                <br />
            </main>
            <LoadingOverlay loading={loading} />
        </div>
    )
}

export default Profile