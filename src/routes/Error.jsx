import PageTitle from "../components/PageTitle"

const Error = () => {
    return (
        <>
            <PageTitle title='Error 404 - not found' />
            <main className="vh-100 d-flex justify-content-center align-items-center">
                <h1 className="logo-color">404 - Page not found</h1>
            </main>
        </>
    )
}

export default Error