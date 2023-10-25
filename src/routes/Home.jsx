import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { useState, useEffect } from "react"

import useHttpRequest from '../hooks/useHttpRequest'

import PageTitle from "../components/PageTitle"
import LoadingOverlay from '../components/LoadingOverlay'
import Header from "../components/Header"
import Discussion from "../components/Discussion"

const Home = () => {
    const MySwal = withReactContent(Swal)

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [userId, setUserId] = useState(sessionStorage.getItem('user_id'))
    const [discussions, setDiscussions] = useState([])

    const firstPage = 1
    const [currentPage, setCurrentPage] = useState(firstPage)
    const [discussionsFilter, setDiscussionsFilter] = useState(1)
    const [postBaseUrl, setPostBaseUrl] = useState('http://localhost/api/discussions')
    const [getBaseUrl, setGetBaseUrl] = useState('http://localhost/api/discussions/filtered/')
    const [urlWithPageParameter, setUrlWithPageParameter] = useState(getBaseUrl + discussionsFilter + '?page=' + firstPage)
    const [lastPage, setLastPage] = useState('')
    const [totalDiscussions, setTotalDiscussions] = useState('')

    const { loading, sendRequest } = useHttpRequest()

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
        setUrlWithPageParameter(getBaseUrl + discussionsFilter + '?page=' + page)
    }

    useEffect(() => {
        setUrlWithPageParameter(getBaseUrl + discussionsFilter + '?page=' + currentPage);
    }, [discussionsFilter, currentPage])

    const handleDiscussionsFilter = (e) => {
        setDiscussionsFilter(e.target.value);
        setUrlWithPageParameter(getBaseUrl + discussionsFilter + '?page=' + currentPage)
    }

    const handleDiscussionSubmit = (e) => {
        e.preventDefault()
        const requestBody = {
            'user_id': userId,
            title,
            'text': body
        };
        sendRequest({ method: 'POST', url: postBaseUrl, body: requestBody })
            .then((responseData) => {
                if (!responseData) {
                    MySwal.fire({
                        title: 'Error',
                        text: 'Try again later',
                        icon: 'error',
                        buttonsStyling: false,
                        customClass: {
                            confirmButton: 'btn primary-logo-button-color'
                        },
                        confirmButtonText: 'Ok'
                    })
                    return
                }
                setUrlWithPageParameter((prevUrl) => {
                    const randomParam = Math.random()
                    return `${prevUrl}&random=${randomParam}`
                })
                setTitle('')
                setBody('')
                MySwal.fire({
                    title: 'Success',
                    text: 'Discussion published',
                    icon: 'success',
                    buttonsStyling: false,
                    customClass: {
                        confirmButton: 'btn primary-logo-button-color'
                    },
                    confirmButtonText: 'Ok'
                })
            })
    }

    const handleDeleteDiscussion = () => {
        setUrlWithPageParameter((prevUrl) => {
            const randomParam = Math.random()
            return `${prevUrl}&random=${randomParam}`
        })
    }

    return (
        <div className="background-quaternary">
            <PageTitle title='Home' />
            <Header />

            <main className="container h-100 mt-3">
                <form className="row background-secondary rounded-lg-3 py-2 px-2" onSubmit={handleDiscussionSubmit}>
                    <div className="col-12 px-lg-0 mb-3">
                        <span className="color-primary ps-lg-0 mb-2">Why not start a new discussion?</span>
                    </div>
                    <div className="col-12 px-lg-0">
                        <input required type="text" className="form-control background-secondary color-quaternary mb-2" id="title"
                            placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}></input>
                        <textarea className="form-control rounded-3 background-secondary color-quaternary mb-2"
                            placeholder="Body" value={body} required onChange={(e) => setBody(e.target.value)}></textarea>
                    </div>
                    <div className="ms-auto col-12 col-lg-2 px-lg-0">
                        <input className="form-control btn btn-sm primary-logo-button-color" type="submit" value='Send' />
                    </div>
                </form>

                <div className="row mt-4 mt-lg-5">
                    <div className="col-12 col-lg-3 px-lg-0 ms-auto">
                        <select className="form-select-sm w-100 rounded-3 background-secondary color-quaternary mb-2" onChange={handleDiscussionsFilter} defaultValue={discussionsFilter}>
                            <option value="1">All discussions</option>
                            <option value="2">Followed users</option>
                            <option value="3">My discussions</option>
                        </select>
                    </div>
                </div>

                {discussions.map((item, index) => (
                    <Discussion key={index} data={item} onDeleteDiscussion={handleDeleteDiscussion} />
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
        </div >
    )
}

export default Home