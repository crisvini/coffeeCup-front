import { Link, useNavigate } from "react-router-dom"

const Back = ({ route, text = 'Back' }) => {
    const navigate = useNavigate()
    return (
        <div className="row">
            <Link onClick={() => navigate(route)} className="tertiary-logo-hover-color ps-lg-0 w-auto">
                <i className="bi bi-arrow-left"></i>&nbsp;{text}
            </Link>
        </div>
    )
}

export default Back