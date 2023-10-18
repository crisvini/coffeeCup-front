const useFormatEmail = () => {
    const formatEmail = (email) => {
        const atIndex = email.indexOf('@')
        if (atIndex !== -1) return email.substring(0, atIndex)
    }

    return {
        formatEmail
    }
}

export default useFormatEmail