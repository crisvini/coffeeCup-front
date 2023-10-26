import { useParams, useNavigate, Link } from "react-router-dom"
import { useEffect, useState } from "react"

import useHttpRequest from "../hooks/useHttpRequest"
import useFormatDate from "../hooks/useFormatDate"
import useFormatEmail from "../hooks/useFormatEmail"
import useVerifyUser from "../hooks/useVerifyUser"

import Header from "../components/Header"
import LoadingOverlay from "../components/LoadingOverlay"
import PageTitle from "../components/PageTitle"
import Answer from "../components/Answer"
import Back from "../components/Back"

const Discussion = () => {
    const { id } = useParams()
    const url = 'http://localhost/api/discussions/' + id

    const [discussion, setDiscussion] = useState([])
    const [answerText, setAnswerText] = useState([])
    const [answers, setAnswers] = useState([])

    const navigate = useNavigate()
    const { loading, sendRequest } = useHttpRequest()
    const { formatDate } = useFormatDate()
    const { formatEmail } = useFormatEmail()

    const { verifyUser } = useVerifyUser()

    useEffect(() => {
        sendRequest({ method: 'GET', url })
            .then((responseData) => {
                setDiscussion(responseData)
            })

        sendRequest({ method: 'GET', url: ('http://localhost/api/discussionsAnswers/filtered/' + id) })
            .then((responseData) => {
                setAnswers(responseData)
            })
    }, [])

    const handleDiscussionAnswer = (e) => {
        e.preventDefault()
        const body = {
            text: answerText,
            discussion_id: id,
            user_id: sessionStorage.getItem('user_id')
        }
        sendRequest({ method: 'POST', url: 'http://localhost/api/discussionsAnswers', body })
            .then((responseData) => {
                setAnswers([responseData, ...answers])
                setAnswerText('')
            })
    }

    return (
        <div className="background-quaternary">
            <PageTitle title={'Discussion ' + discussion.id} />
            <Header />

            <main className="container h-100 mt-1">
                <Back route="/home" />
                <div className="row background-secondary rounded-lg-3 py-2 px-2 mt-2">
                    <div className="col-12 px-lg-0 mb-1">
                        <div className="row">
                            <div className="col-10 col-lg-8">
                                <span className="color-primary fs-8">
                                    <Link to={'/profile/' + discussion.user_id} className="fw-bold primary-link-color">{discussion.user ? formatEmail(discussion.user.email) : "Loading"}</Link>
                                    &nbsp;published a discussion
                                </span>
                            </div>
                            {
                                !verifyUser({ userId: discussion.user_id }) ?
                                    <div className="col-2 col-lg-1 text-lg-end ms-lg-auto">
                                        <button className="btn btn-sm quaternary-logo-button-color"><i className="bi bi-hand-thumbs-up"></i></button>
                                    </div>
                                    :
                                    <div className="col-2 col-lg-1 text-lg-end ms-lg-auto">
                                        <button className="btn btn-sm btn-danger" onClick={() => handleDeleteDiscussionButton({ id: data.id })}><i className="bi bi-trash"></i></button>
                                    </div>
                            }
                        </div>
                    </div>
                    <div className="col-12 px-lg-0 mb-1">
                        <h1 className="additional-logo-color">{discussion.title}</h1>
                    </div>
                    <div className="col-12 px-lg-0 mb-1">
                        <span className="color-tertiary fs-6">{discussion.text}</span>
                    </div>
                    <div className="col-12 px-lg-0 mb-1">
                        <span className="color-quaternary fs-10">{formatDate(discussion.created_at)}</span>
                    </div>
                </div>

                <form className="row background-secondary rounded-lg-3 py-2 px-2 mt-3" onSubmit={handleDiscussionAnswer}>
                    <div className="col-12 px-lg-0">
                        <textarea className="form-control rounded-3 background-secondary color-quaternary mb-2"
                            placeholder="Write a answer to this discussion" value={answerText} required onChange={(e) => setAnswerText(e.target.value)}></textarea>
                    </div>
                    <div className="ms-auto col-12 col-lg-2 px-lg-0">
                        <input className="form-control btn btn-sm primary-logo-button-color" type="submit" value='Send' />
                    </div>
                </form>

                {answers.map((item, index) => (
                    <Answer key={index} data={item} />
                ))}


                <br />
            </main>
            <LoadingOverlay loading={loading} />
        </div >
    )
}

export default Discussion