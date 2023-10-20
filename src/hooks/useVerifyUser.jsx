const useVerifyUser = () => {
    const verifyUser = ({ userId }) => {
        if (userId == sessionStorage.getItem('user_id')) return true
        return false
    }

    return {
        verifyUser
    }
}

export default useVerifyUser