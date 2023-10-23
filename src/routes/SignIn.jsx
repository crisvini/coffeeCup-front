import Logo from '../assets/logo.png'
import PrimaryBanner from '../assets/primary-banner.svg'

import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react'

import useHttpRequest from '../hooks/useHttpRequest'
import useLogout from '../hooks/useLogout'

import PageTitle from "../components/PageTitle"
import LoadingOverlay from '../components/LoadingOverlay'
import SideBanner from '../components/SideBanner'

const SignIn = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()
    const MySwal = withReactContent(Swal)

    const { loading, sendRequest } = useHttpRequest()
    const { logout } = useLogout()

    useEffect(() => {
        if (sessionStorage.getItem('user_token')) logout()
        sessionStorage.clear()
    }, [])

    const handlePostRequest = (e) => {
        e.preventDefault()

        const requestBody = {
            email,
            password
        };
        sendRequest({ method: 'POST', url: 'http://localhost/api/login', body: requestBody })
            .then((responseData) => {
                if (!responseData) {
                    MySwal.fire({
                        title: 'Error',
                        text: 'Wrong email/password',
                        icon: 'error',
                        buttonsStyling: false,
                        customClass: {
                            confirmButton: 'btn primary-logo-button-color'
                        },
                        confirmButtonText: 'Ok'
                    })
                    return
                } else if (responseData.error) {
                    const userId = responseData.user_id
                    sendRequest({ method: 'POST', url: 'http://localhost/api/send-verification-token', body: { email } })
                        .then((responseData) => {
                            sessionStorage.setItem('verification_token', responseData)
                            sessionStorage.setItem('verification_email', email)
                            sessionStorage.setItem('user_id_verification', userId)
                            navigate('/signup/email-verification')
                        })
                } else {
                    sessionStorage.setItem('user_token', responseData.token);
                    sessionStorage.setItem('user_id', responseData.user_id);
                    sessionStorage.setItem('user_email', responseData.email);
                    navigate('/home')
                }
            })
    }

    return (
        <div className="background-quaternary vh-100">
            <PageTitle title='Sign in' />
            <main className="container h-100 m-0 mw-100">
                <div className="row h-100">
                    <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center background-quaternary">
                        <div className="row">
                            <div className="col-11 col-lg-8 mx-auto text-center mt-3">
                                <img style={{ width: '38%' }} src={Logo} />
                            </div>
                            <div className="col-11 col-lg-8 mx-auto text-center fs-4 color-primary mt-3">
                                <span>coffee cup</span>
                            </div>
                            <form onSubmit={handlePostRequest}>
                                <div className="col-11 col-lg-8 mx-auto mt-3">
                                    <input required type="email" className="form-control background-secondary color-quaternary" id="email"
                                        placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                                </div>
                                <div className="col-11 col-lg-8 mx-auto mt-3">
                                    <input required type="password" className="form-control background-secondary color-quaternary" id="password"
                                        placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                                </div>
                                <div className="col-11 col-lg-8 mx-auto mt-3">
                                    <input type="submit" className="btn primary-logo-button-color w-100" value="Sign in" />
                                </div>
                            </form>
                            <div className="col-11 col-lg-8 mx-auto text-center mt-3">
                                <Link to="/signup" className="logo-link-color">Don't have an
                                    account? Sign up</Link>
                            </div>
                        </div>
                    </div>
                    <SideBanner banner={PrimaryBanner} />
                </div>
            </main>
            <LoadingOverlay loading={loading} />
        </div>
    )
}

export default SignIn