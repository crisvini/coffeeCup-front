import Logo from '../assets/logo.png'
import { Link } from "react-router-dom"

const SimpleHeader = () => {
    return (
        <header className="container-fluid m-0 mw-100">
            <div className="row">
                <div className="background-secondary p-2 col-12 mx-auto text-left fs-4 color-primary fixed-top">
                    <div className="row">
                        <div className="col-11 col-lg-10 mx-auto">
                            <Link to='/' className='primary-link-color'>
                                <img style={{ width: '5vh' }} src={Logo} />&nbsp;
                                <span className="color-primary align-middle fs-3">coffee cup</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header >
    )
}

export default SimpleHeader