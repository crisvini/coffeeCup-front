import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

import { Link } from "react-router-dom"
import useFormatDate from "../hooks/useFormatDate"
import useFormatEmail from "../hooks/useFormatEmail"
import useVerifyUser from "../hooks/useVerifyUser"
import useHttpRequest from '../hooks/useHttpRequest'

const Discussion = ({ data, nonLinkedProfile = null, onDeleteDiscussion }) => {
    const MySwal = withReactContent(Swal)

    const { formatDate } = useFormatDate()
    const { formatEmail } = useFormatEmail()
    const { verifyUser } = useVerifyUser()
    const { loading, sendRequest } = useHttpRequest()

    const handleDeleteDiscussionButton = ({ id }) => {
        Swal.fire({
            title: 'Wait!',
            text: ('Are you shure you want to delete discussion ' + id + '?'),
            icon: 'warning',
            buttonsStyling: false,
            confirmButtonText: 'Ok',
            showDenyButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: 'No',
            customClass: {
                confirmButton: 'btn quaternary-logo-button-color me-2',
                denyButton: 'btn primary-logo-button-color'
            },
        }).then((result) => {
            if (result.isConfirmed) {
                sendRequest({ method: 'DELETE', url: ('http://localhost/api/discussions/' + id) })
                    .then((responseData) => {
                        onDeleteDiscussion()
                    })
            }
        })
    }

    return (
        <div className="row background-secondary mt-3 rounded-lg-3 py-2 px-2">
            <div className="col-12 px-lg-0 mb-1">
                <div className="row">
                    <div className="col-10 col-lg-8">
                        {nonLinkedProfile ?
                            <span className="color-primary">
                                {formatEmail(data.user.email)} published a discussion
                            </span>
                            :
                            <span className="color-primary">
                                <Link to={'/profile/' + data.user_id} className="fw-bold primary-link-color">{formatEmail(data.user.email)}</Link> published a discussion
                            </span>
                        }
                    </div>
                    {
                        !verifyUser({ userId: data.user_id }) ?
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
                <Link className="color-tertiary fs-1 primary-link-color" to={'/discussion/' + data.id}>{data.title}</Link>
            </div>
            <div className="col-12 px-lg-0 mb-1">
                <span className="color-tertiary fs-6">{data.text}</span>
            </div>
            <div className="col-12 px-lg-0 mb-1">
                <span className="color-quaternary fs-10">{formatDate(data.created_at)}</span>
            </div>
        </div>
    )
}

export default Discussion