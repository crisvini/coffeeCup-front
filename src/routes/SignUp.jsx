import Logo from '../assets/logo.png'
import SignUpBanner from '../assets/sign-up-banner.svg'

import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { Link, useNavigate } from "react-router-dom"
import { useState } from 'react'

import useHttpRequest from '../hooks/useHttpRequest'

import PageTitle from "../components/PageTitle"
import LoadingOverlay from '../components/LoadingOverlay'
import SideBanner from '../components/SideBanner'
import BackLink from '../components/BackLink'

const SignUp = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()
    const MySwal = withReactContent(Swal)

    const { loading, sendRequest } = useHttpRequest()

    const handlePostRequest = (e) => {
        e.preventDefault()

        const requestBody = {
            name,
            email,
            password
        };
        sendRequest({ method: 'POST', url: 'http://localhost/api/users/store', body: requestBody })
            .then((responseData) => {
                console.log(responseData);
                if (!responseData) {
                    MySwal.fire({
                        title: 'Ops..',
                        text: 'E-mail already used, please try with another one',
                        icon: 'warning',
                        buttonsStyling: false,
                        customClass: {
                            confirmButton: 'btn primary-logo-button-color'
                        },
                        confirmButtonText: 'Ok'
                    })
                    return
                }
                navigate('/signup/email-verification')
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
                                <Link to='/' className='primary-link-color'>
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
                            <BackLink link='/' swalText='Do you really want to get back? You will lost unsaved data' linkText='Login' />
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