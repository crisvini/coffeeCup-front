const useFormatDate = () => {
    const formatDate = (inputDate) => {
        const date = new Date(inputDate)
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        }
        return date.toLocaleDateString('en-US', options)
    }

    return {
        formatDate
    }
}

export default useFormatDate