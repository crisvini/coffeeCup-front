import { useNavigate } from "react-router-dom"

import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const BackLink = ({ link, swalText, linkText }) => {

    const navigate = useNavigate()
    const MySwal = withReactContent(Swal)

    const handleBackLink = (link, text) => {
        Swal.fire({
            title: 'Wait!',
            text: text,
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
            if (result.isConfirmed) navigate(link)
        })
    }

    return (
        <a onClick={() => handleBackLink(link, swalText)} className="tertiary-logo-hover-color w-auto">
            <i className="bi bi-arrow-left"></i>&nbsp;{linkText}
        </a>
    );

}

export default BackLink