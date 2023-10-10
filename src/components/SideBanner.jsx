const SideBanner = ({ banner }) => {
    return (
        <div className="col-6 text-center d-none d-lg-block background-tertiary">
            <img className="h-100 w-75" src={banner} />
        </div>
    )
}

export default SideBanner