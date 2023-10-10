import Logo from '../assets/logo.png'
import SignUpBanner from '../assets/sign-up-banner.svg'

import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react'

import useHttpRequest from '../hooks/useHttpRequest'
import useLogout from '../hooks/useLogout'

import PageTitle from "../components/PageTitle"
import LoadingOverlay from '../components/LoadingOverlay'
import SideBanner from '../components/SideBanner'

const SignUp = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()
    const MySwal = withReactContent(Swal)

    const { loading, sendRequest } = useHttpRequest()
    const { logout } = useLogout()

    useEffect(() => {
        if (sessionStorage.getItem('user_token')) logout()
    }, [])

    const handlePostRequest = (e) => {
        e.preventDefault()

        const requestBody = {
            email,
            password,
        };
        sendRequest({ method: 'POST', url: 'http://localhost/api/login', body: requestBody })
            .then((responseData) => {
                if (!responseData) {
                    MySwal.fire({
                        title: 'Error',
                        text: 'Wrong email/password',
                        icon: 'warning',
                        buttonsStyling: false,
                        customClass: {
                            confirmButton: 'btn primary-logo-button-color'
                        },
                        confirmButtonText: 'Ok'
                    })
                    return
                }
                sessionStorage.setItem('user_token', responseData);

                navigate('/home')
            })
    }

    return (
        <div className="background-quaternary vh-100">
            <PageTitle title='Sign up' />
            <header className="container-fluid m-0 mw-100">
                <div className="row">
                    <div className="background-secondary p-2 col-12 mx-auto text-left fs-4 color-primary fixed-top">
                        <div className="row">
                            <div className="col-11 col-lg-10 mx-auto">
                                <Link to="/" className='primary-link-color'>
                                    <img style={{ width: '5vh' }} src={Logo} />&nbsp;
                                    <span className="color-primary align-middle fs-3">coffee cup</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </header >

            <main className="container h-100 m-0 mw-100">
                <div className="row h-100">
                    <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center background-quaternary">
                        <div className="row">
                            <div className="col-11 col-lg-8 mx-auto text-left fs-5 color-primary mt-lg-4 w-100">
                                <Link to="/" className='tertiary-logo-hover-color'>
                                    <i className="bi bi-arrow-left"></i>&nbsp;Login</Link>
                            </div>
                            <div className="col-11 col-lg-8 mx-auto text-left fs-4 color-primary mt-lg-4 mt-2 w-100">
                                <span>Sign up</span>
                            </div>
                            <form onSubmit={handlePostRequest}>
                                <div className="col-11 col-lg-8 mx-auto mt-3 w-100">
                                    <input type="text" className="form-control background-secondary color-quaternary" id="name"
                                        placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}></input>
                                </div>
                                <div className="col-11 col-lg-8 mx-auto mt-3 w-100">
                                    <input type="email" className="form-control background-secondary color-quaternary" id="email"
                                        placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                                </div>
                                <div className="col-11 col-lg-8 mx-auto mt-3 w-100">
                                    <input type="password" className="form-control background-secondary color-quaternary" id="password"
                                        placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                                </div>
                                <div className="col-11 col-lg-8 mx-auto mt-3 w-100">
                                    <input type="submit" className="btn primary-logo-button-color w-100" value="Sign up" />
                                </div>
                            </form>
                        </div>
                    </div>
                    <SideBanner banner={SignUpBanner} />
                </div>
            </main >
            <LoadingOverlay loading={loading} />
        </div >
    )
}

export default SignUp