const Pagination = ({ currentPage, lastPage, totalDiscussions, onPageChange }) => {
    return (
        <div className="row mt-3">
            <div className="ms-auto col-12 col-lg-4 px-lg-0 text-center text-lg-end">
                <div className="btn-group w-100">
                    <button className="btn btn-sm quaternary-logo-button-color" onClick={() => onPageChange(1)}><i className="bi bi-chevron-double-left"></i>&nbsp;First</button>
                    <button className="btn btn-sm primary-logo-button-color" onClick={() => onPageChange(currentPage - 1)}><i className="bi bi-chevron-left"></i>&nbsp;Previous</button>
                    <button className="btn btn-sm primary-logo-button-color" onClick={() => onPageChange(currentPage + 1)}>Next&nbsp;<i className="bi bi-chevron-right"></i></button>
                    <button className="btn btn-sm quaternary-logo-button-color" onClick={() => onPageChange(lastPage)}>Last&nbsp;<i className="bi bi-chevron-double-right"></i></button>
                </div>
                <div className="text-end">
                    <span className="color-primary fs-10">Page {currentPage} of {lastPage}</span>
                </div>
                <div className="text-end">
                    <span className="color-primary fs-10">Total of discussions: {totalDiscussions}</span>
                </div>
            </div>
        </div>
    )
}

export default Pagination