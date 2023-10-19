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

    const { loading, sendRequest } = useHttpRequest()

    const returnDiscussions = () => {
        useEffect(() => {
            sendRequest({ method: 'GET', url: 'http://localhost/api/discussions', descOrder: true })
                .then((responseData) => {
                    setDiscussions(responseData)
                })
        }, [])
    }
    returnDiscussions()

    const handleDiscussionSubmit = (e) => {
        e.preventDefault()

        const requestBody = {
            'user_id': userId,
            title,
            'text': body
        };
        sendRequest({ method: 'POST', url: 'http://localhost/api/discussions', body: requestBody })
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
                setDiscussions([responseData, ...discussions])
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

                {discussions.map((item, index) => (
                    <Discussion key={index} data={item} />
                ))}

                <br />
            </main>
            <LoadingOverlay loading={loading} />
        </div >
    )
}

export default Home