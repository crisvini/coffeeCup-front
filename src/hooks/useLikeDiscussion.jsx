import useHttpRequest from "./useHttpRequest"

const useLikeDiscussion = () => {
    const { sendRequest } = useHttpRequest()

    const handleLikeDiscussionButton = ({ id }) => {
        sendRequest({ method: 'DELETE', url: ('http://localhost/api/discussions/' + id) })
            .then((responseData) => {
                if (onDeleteDiscussion) onDeleteDiscussion()
                else navigate('/home')
            })
    }

    return {
        handleDeleteDiscussionButton
    }
}

export default useLikeDiscussion