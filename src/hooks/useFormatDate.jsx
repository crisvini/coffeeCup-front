const useFormatDate = () => {
    const formatDate = (inputDate, onlyDate = null) => {
        const date = new Date(inputDate)
        let options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        }
        if (onlyDate) {
            options = {
                year: 'numeric',
                month: '2-digit',
            }
        }
        return date.toLocaleDateString('en-US', options)
    }

    return {
        formatDate
    }
}

export default useFormatDate