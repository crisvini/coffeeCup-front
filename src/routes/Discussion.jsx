import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"

import useHttpRequest from "../hooks/useHttpRequest"
import useFormatDate from "../hooks/useFormatDate"
import useFormatEmail from "../hooks/useFormatEmail"
import useVerifyUser from "../hooks/useVerifyUser"
import useDeleteDiscussion from "../hooks/useDeleteDiscussion"

import Header from "../components/Header"
import LoadingOverlay from "../components/LoadingOverlay"
import PageTitle from "../components/PageTitle"
import Answer from "../components/Answer"
import Back from "../components/Back"

const Discussion = () => {
    const { id } = useParams()
    const url = `http://localhost/api/discussions/${id}`

    const [discussion, setDiscussion] = useState([])
    const [answerText, setAnswerText] = useState([])
    const [answers, setAnswers] = useState([])
    const [likedDiscussion, setLikedDiscussion] = useState(false)
    const [likeButtonIcon, setLikeButtonIcon] = useState('')

    const { loading, sendRequest } = useHttpRequest()
    const { formatDate } = useFormatDate()
    const { formatEmail } = useFormatEmail()
    const { handleDeleteDiscussionButton } = useDeleteDiscussion()

    const { verifyUser } = useVerifyUser()

    useEffect(() => {
        sendRequest({ method: 'GET', url })
            .then((responseData) => {
                setDiscussion(responseData)
            })

        sendRequest({ method: 'GET', url: (`http://localhost/api/discussionsAnswers/filtered/${id}`) })
            .then((responseData) => {
                setAnswers(responseData)
            })
    }, [likedDiscussion])

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

    useEffect(() => {
        sendRequest({ method: 'GET', url: `http://localhost/api/discussionsLikes/show-discussion-like/${id}` })
            .then((responseData) => {
                if (responseData) {
                    setLikedDiscussion(true)
                    setLikeButtonIcon('bi bi-hand-thumbs-up-fill')
                } else {
                    setLikedDiscussion(false)
                    setLikeButtonIcon('bi bi-hand-thumbs-up')
                }
            })
    }, [likedDiscussion])

    const handleLikeDiscussionButton = () => {
        const body = {
            user_id: sessionStorage.getItem('user_id'),
            discussion_id: id
        }
        if (!likedDiscussion) {
            sendRequest({ method: 'POST', url: 'http://localhost/api/discussionsLikes', body })
                .then((responseData) => {
                    setLikedDiscussion(true)
                    setLikeButtonIcon('bi bi-hand-thumbs-up-fill')
                })
        } else {
            sendRequest({ method: 'DELETE', url: `http://localhost/api/discussionsLikes/${id}`, body })
                .then((responseData) => {
                    setLikedDiscussion(false)
                    setLikeButtonIcon('bi bi-hand-thumbs-up')
                })
        }
    }

    return (
        <div className="background-quaternary">
            <PageTitle title={'Discussion ' + discussion.id} />
            {discussion.user_id &&
                <Header />
            }

            {discussion.user_id &&
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
                                            <button className="btn btn-sm quaternary-logo-button-color" onClick={() => handleLikeDiscussionButton({ id })}><i className={likeButtonIcon}></i></button>
                                        </div>
                                        :
                                        <div className="col-2 col-lg-1 text-lg-end ms-lg-auto">
                                            <button className="btn btn-sm btn-danger" onClick={() => handleDeleteDiscussionButton({ id })}><i className="bi bi-trash"></i></button>
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
                            <div className="d-flex justify-content-between align-items-center">
                                <span className="color-quaternary fs-10">{formatDate(discussion.created_at)}</span>
                                <span className="color-quaternary fs-10">{discussion.discussions_likes_count} likes</span>
                            </div>
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
            }

            <LoadingOverlay loading={loading} />
        </div >
    )
}

export default Discussion