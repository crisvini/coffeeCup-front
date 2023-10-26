import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import useHttpRequest from "../hooks/useHttpRequest"
import useFormatDate from "../hooks/useFormatDate"
import useFormatEmail from "../hooks/useFormatEmail"
import useVerifyUser from "../hooks/useVerifyUser"
import usePageChange from "../hooks/usePageChange"

import PageTitle from "../components/PageTitle"
import LoadingOverlay from '../components/LoadingOverlay'
import Header from "../components/Header"
import Back from "../components/Back"
import Discussion from "../components/Discussion"
import Pagination from "../components/Pagination"

const Profile = () => {
    const { id } = useParams()

    const [user, setUser] = useState([])
    const [discussions, setDiscussions] = useState([])

    const firstPage = 1
    const [baseUrl, setBaseUrl] = useState(`http://localhost/api/discussions/filtered-by-user/${id}`)
    const [lastPage, setLastPage] = useState('')
    const [totalDiscussions, setTotalDiscussions] = useState(false)
    const [followedUser, setFollowedUser] = useState(false)
    const [followButtonText, setFollowButtonText] = useState('')

    const { loading, sendRequest } = useHttpRequest()
    const { formatDate } = useFormatDate()
    const { formatEmail } = useFormatEmail()
    const { verifyUser } = useVerifyUser()
    const { currentPage, urlWithPageParameter, setUrlWithPageParameter, handlePageChange } = usePageChange({ initialPage: firstPage, initialUrl: `${baseUrl}?page=${firstPage}`, lastPage, baseUrl })

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

    const handleDeleteDiscussion = () => {
        setUrlWithPageParameter((prevUrl) => {
            const randomParam = Math.random()
            return `${prevUrl}&random=${randomParam}`
        })
    }

    useEffect(() => {
        sendRequest({ method: 'GET', url: `http://localhost/api/followedUsers/show-followed-user/${id}` })
            .then((responseData) => {
                if (responseData) {
                    setFollowedUser(true)
                    setFollowButtonText('Unfollow')
                } else {
                    setFollowedUser(false)
                    setFollowButtonText('Follow')
                }
            })
    }, [followedUser])

    const handleFollowButton = () => {
        const body = {
            user_id: sessionStorage.getItem('user_id'),
            followed_user_id: id
        }
        if (!followedUser) {
            sendRequest({ method: 'POST', url: `http://localhost/api/followedUsers`, body })
                .then((responseData) => {
                    setFollowedUser(true)
                    setFollowButtonText('Unfollow')
                })
        } else {
            sendRequest({ method: 'DELETE', url: `http://localhost/api/followedUsers/${id}`, body })
                .then((responseData) => {
                    setFollowedUser(false)
                    setFollowButtonText('Follow')
                })
        }
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
                                <span className="color-quaternary fs-10">{user.interactions >= 0 ? (user.interactions + ' interactions') : 'Loading..'}</span>
                            </div>
                            <div className="col-12">
                                <span className="color-quaternary fs-10">{user.interactions >= 0 ? (user.interactions + ' followers') : 'Loading..'}</span>
                            </div>
                        </div>
                    </div>
                    {
                        !verifyUser({ userId: id }) &&
                        <div className="col-12 col-lg-2 px-lg-0 text-lg-start mt-3">
                            <button className="btn btn-sm primary-logo-button-color w-100" onClick={() => handleFollowButton()}>{followButtonText}</button>
                        </div>
                    }
                </div>

                {totalDiscussions === false ?
                    <div className="row background-secondary mt-3 rounded-lg-3 py-2 px-2">
                        <h1 className="color-primary my-2">Loading..</h1>
                    </div>
                    :
                    totalDiscussions === 0 ?
                        <div className="row background-secondary mt-3 rounded-lg-3 py-2 px-2">
                            <h1 className="color-primary my-2">No discussions found..</h1>
                        </div>
                        :
                        discussions.map((item, index) => (
                            <Discussion key={index} data={item} nonLinkedProfile='true' onDeleteDiscussion={handleDeleteDiscussion} />
                        ))
                }

                {totalDiscussions > 0 &&
                    <Pagination currentPage={currentPage} lastPage={lastPage} totalDiscussions={totalDiscussions} onPageChange={handlePageChange} />
                }

                <br />
            </main>
            <LoadingOverlay loading={loading} />
        </div>
    )
}

export default Profile