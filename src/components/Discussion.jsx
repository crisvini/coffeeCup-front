import { Link } from "react-router-dom"
import useFormatDate from "../hooks/useFormatDate"
import useFormatEmail from "../hooks/useFormatEmail"
import useVerifyUser from "../hooks/useVerifyUser"
import useDeleteDiscussion from "../hooks/useDeleteDiscussion"

const Discussion = ({ data, nonLinkedProfile = null, onDeleteDiscussion }) => {

    const { formatDate } = useFormatDate()
    const { formatEmail } = useFormatEmail()
    const { verifyUser } = useVerifyUser()
    const { handleDeleteDiscussionButton } = useDeleteDiscussion()

    return (
        <div className="row background-secondary mt-3 rounded-lg-3 py-2 px-2">
            <div className="col-12 px-lg-0 mb-1">
                <div className="row">
                    <div className="col-10 col-lg-8">
                        {nonLinkedProfile ?
                            <span className="color-primary fs-8">
                                {formatEmail(data.user.email)} published a discussion
                            </span>
                            :
                            <span className="color-primary fs-8">
                                <Link to={'/profile/' + data.user_id} className="fw-bold primary-link-color">{formatEmail(data.user.email)}</Link> published a discussion
                            </span>
                        }
                    </div>
                    {verifyUser({ userId: data.user_id }) &&
                        <div className="col-2 col-lg-1 text-lg-end ms-lg-auto">
                            <button className="btn btn-sm btn-danger" onClick={() => handleDeleteDiscussionButton({ id: data.id, onDeleteDiscussion })}><i className="bi bi-trash"></i></button>
                        </div>
                    }

                </div>
            </div>
            <div className="col-12 px-lg-0 mb-1">
                <Link className="color-tertiary fs-1 primary-link-color" to={'/discussion/' + data.id}>{data.title}</Link>
            </div>
            <div className="col-12 px-lg-0 mb-1">
                <span className="color-tertiary fs-6">{data.text}</span>
            </div>
            <div className="col-12 px-lg-0 mb-1">
                <div className="d-flex justify-content-between align-items-center">
                    <span className="color-quaternary fs-10">{formatDate(data.created_at)}</span>
                    <span className="color-quaternary fs-10">0 likes</span>
                </div>
            </div>
        </div>
    )
}

export default Discussion