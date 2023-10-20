import Logo from '../assets/logo.png'
import { Link } from "react-router-dom"

import useLogout from '../hooks/useLogout'

const Header = () => {
    const { logout } = useLogout()

    return (
        <nav className="navbar navbar-expand-lg navbar-dark background-tertiary sticky-top">
            <div className="container">
                <Link className="navbar-brand" to="/home">
                    <img style={{ width: '3.5vh' }} src={Logo} />&nbsp;
                    <span className="color-primary align-middle fs-5 tertiary-logo-hover-color">coffee cup</span>
                </Link>
                <button className="navbar-toggler clear-button pe-0" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbar" aria-controls="navbar"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon color-primary"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbar">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className='nav-link color-primary fs-6 tertiary-logo-hover-color py-0' to="/home">Discussions</Link>
                        </li>
                    </ul>
                    <span>
                        <ul className="navbar-nav flex-row flex-wrap ms-md-auto back">
                            <li className="nav-item dropdown">
                                <button type="button"
                                    className="btn btn-link nav-link py-2 px-0 px-lg-2 dropdown-toggle color-primary tertiary-logo-hover-color"
                                    data-bs-toggle="dropdown" aria-expanded="false" data-bs-display="static">
                                    crisvini.leoncini
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end background-tertiary">
                                    <li>
                                        <Link className="custom-dropdown-item current color-primary tertiary-logo-hover-color" to="/profile">Profile</Link>
                                    </li>
                                    <li>
                                        <Link className="custom-dropdown-item current color-primary tertiary-logo-hover-color" onClick={() => logout()}>Logout</Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </span>
                </div>
            </div>
        </nav >
    )
}

export default Header