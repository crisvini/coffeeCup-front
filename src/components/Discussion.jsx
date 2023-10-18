import { Link } from "react-router-dom"
import useFormatDate from "../hooks/useFormatDate"
import useFormatEmail from "../hooks/useFormatEmail"

const Discussion = ({ data }) => {
    const { formatDate } = useFormatDate()
    const { formatEmail } = useFormatEmail()

    return (
        <div className="row background-secondary mt-3 rounded-lg-3 py-2 px-2">
            <div className="col-12 px-lg-0 mb-1">
                <div className="row">
                    <div className="col-12 col-lg-8">
                        <span className="color-primary"><Link to='/profile/39' className="fw-bold primary-link-color">{formatEmail(data.user.email)}</Link> published a discussion</span>
                    </div>
                    <div className="col-12 col-lg-4 text-lg-end">
                        <button className="btn btn-sm quaternary-logo-button-color"><i className="bi bi-hand-thumbs-up"></i></button>
                        <button className="ms-2 btn btn-sm primary-logo-button-color">Follow</button>
                    </div>
                </div>
            </div>
            <div className="col-12 px-lg-0 mb-1">
                <Link className="color-tertiary fs-1 primary-link-color">{data.title}</Link>
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