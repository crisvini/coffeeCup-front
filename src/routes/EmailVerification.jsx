import SignUpBanner from '../assets/sign-up-banner.svg'

import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { useNavigate } from "react-router-dom"
import { useState } from 'react'

import useHttpRequest from '../hooks/useHttpRequest'

import PageTitle from "../components/PageTitle"
import LoadingOverlay from '../components/LoadingOverlay'
import SideBanner from '../components/SideBanner'
import BackLink from '../components/BackLink'
import SimpleHeader from '../components/SimpleHeader'

const EmailVerification = () => {

    const [token, setToken] = useState("")

    const navigate = useNavigate()
    const MySwal = withReactContent(Swal)

    const { loading, sendRequest } = useHttpRequest()

    const handleEmailVerification = (e) => {
        e.preventDefault()

        const verificationToken = sessionStorage.getItem('verification_token')
        const userId = sessionStorage.getItem('user_id_verification')

        if (verificationToken === token) {
            sendRequest({ method: 'GET', url: ('http://localhost/api/receive-verification-token/' + userId) })
                .then((responseData) => {
                    console.log(responseData);
                    MySwal.fire({
                        title: 'Success',
                        text: 'E-mail verified with success, you will be redirected to the sign in page',
                        icon: 'success',
                        buttonsStyling: false,
                        customClass: {
                            confirmButton: 'btn primary-logo-button-color'
                        },
                        confirmButtonText: 'Ok'
                    }).then(() => {
                        sessionStorage.removeItem('verification_token')
                        sessionStorage.removeItem('user_id_verification')
                        navigate('/')
                    })
                })
        } else {
            MySwal.fire({
                title: 'Ops..',
                text: 'Invalid token',
                icon: 'error',
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'btn primary-logo-button-color'
                },
                confirmButtonText: 'Ok'
            })
        }
    }

    return (
        <div className="background-quaternary vh-100">
            <PageTitle title='E-mail verification' />
            <SimpleHeader />

            <main className="container h-100 m-0 mw-100">
                <div className="row h-100">
                    <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center background-quaternary">
                        <div className="row">
                            <BackLink link='/signup' swalText='Do you really want to get back? You will lost unsaved data' linkText='Sign up' />
                            <div className="col-11 col-lg-8 mx-auto text-left fs-4 color-primary mt-lg-4 mt-2 w-100">
                                <span>E-mail verification</span>
                            </div>
                            <form onSubmit={handleEmailVerification}>
                                <div className="col-11 col-lg-8 mx-auto mt-3 w-100">
                                    <input type="text" className="form-control background-secondary color-quaternary" id="token"
                                        placeholder="Token" value={token} onChange={(e) => setToken(e.target.value)}></input>
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

export default EmailVerification