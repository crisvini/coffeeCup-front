import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { useNavigate } from "react-router-dom"

import useHttpRequest from "./useHttpRequest"

const useDeleteDiscussion = () => {
    const MySwal = withReactContent(Swal)
    const navigate = useNavigate()

    const { sendRequest } = useHttpRequest()

    const handleDeleteDiscussionButton = ({ id, onDeleteDiscussion = null }) => {
        MySwal.fire({
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
                        if (onDeleteDiscussion) onDeleteDiscussion()
                        else navigate('/home')
                    })
            }
        })
    }

    return {
        handleDeleteDiscussionButton
    }
}

export default useDeleteDiscussion