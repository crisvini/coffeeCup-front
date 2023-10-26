import { useState } from "react"

const usePageChange = ({ initialPage, initialUrl, lastPage, baseUrl, filter = null }) => {
    const [currentPage, setCurrentPage] = useState(initialPage)
    const [urlWithPageParameter, setUrlWithPageParameter] = useState(initialUrl)

    const handlePageChange = (page) => {
        if (page < 1) page = 1
        if (page > lastPage) page = lastPage

        setCurrentPage(page)
        if (filter) setUrlWithPageParameter(`${baseUrl}${filter}?page=${page}`)
        else setUrlWithPageParameter(`${baseUrl}?page=${page}`)
    }

    return { currentPage, urlWithPageParameter, setUrlWithPageParameter, handlePageChange }
}

export default usePageChange