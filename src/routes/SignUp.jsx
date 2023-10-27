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
import SimpleHeader from '../components/SimpleHeader'

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

                sessionStorage.setItem('user_id_verification', responseData.id)

                sendRequest({ method: 'POST', url: 'http://localhost/api/send-verification-token', body: { email } })
                    .then((responseData) => {
                        sessionStorage.setItem('verification_token', responseData)
                        sessionStorage.setItem('verification_email', email)
                        navigate('/signup/email-verification')
                    })
            })
    }

    return (
        <div className="background-quaternary vh-100">
            <PageTitle title='Sign up' />
            <SimpleHeader />

            <main className="container h-100 m-0 mw-100">
                <div className="row h-100">
                    <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center background-quaternary">
                        <div className="row w-100">
                            <div className="col-12 col-lg-8 mx-auto">
                                <BackLink link='/' swalText='Do you really want to get back? You will lost unsaved data' linkText='Login' warning={false} />
                            </div>
                            <div className="col-12 col-lg-8 mx-auto text-left fs-4 color-primary mt-lg-4 mt-2">
                                <span>Sign up</span>
                            </div>
                            <form onSubmit={handlePostRequest} className='col-12 col-lg-8 mx-auto'>
                                <input required type="text" className="form-control background-secondary color-quaternary mt-3" id="name"
                                    placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}></input>
                                <input required type="email" className="form-control background-secondary color-quaternary mt-3" id="email"
                                    placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                                <input required type="password" className="form-control background-secondary color-quaternary mt-3" id="password"
                                    placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                                <input type="submit" className="btn primary-logo-button-color w-100 mt-3" value="Sign up" />
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