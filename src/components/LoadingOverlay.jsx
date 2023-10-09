const LoadingOverlay = ({ loading }) => {
    return (
        <>
            {loading && (
                <div className="position-fixed w-100 h-100 d-flex justify-content-center align-items-center"
                    style={{
                        background: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 9999,
                        top: 0,
                        left: 0,
                    }}>
                    <div className="spinner-border logo-color" role="status"></div>
                </div>
            )}
        </>
    );
};

export default LoadingOverlay;
