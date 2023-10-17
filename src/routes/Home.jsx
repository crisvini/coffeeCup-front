import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { Link, useNavigate } from "react-router-dom"
import { useState } from 'react'

import useHttpRequest from '../hooks/useHttpRequest'

import PageTitle from "../components/PageTitle"
import LoadingOverlay from '../components/LoadingOverlay'
import Header from "../components/Header"

const Home = () => {
    const navigate = useNavigate()
    const MySwal = withReactContent(Swal)

    const { loading, sendRequest } = useHttpRequest()

    return (
        <div className="background-quaternary vh-100">
            <PageTitle title='Home' />
            <Header />

            <main className="container h-100 mt-3 w-lg-35">
                <div className="row background-secondary py-2 px-3" id="create_post">
                    <div className="col-11 mx-auto px-0">
                        <div className="pe-2 h-100">
                            <textarea className="form-control background-tertiary primary-border color-primary h-100"
                                placeholder="Thinking about something?"></textarea>
                        </div>
                    </div>
                    <div className="col-1 mx-auto px-0 text-center">
                        <div id="post_buttons">
                            <span className="color-primary mr-2 fs-4 tertiary-logo-hover-color pointer" id="add_image_button"><i
                                className="fa-regular fa-image"></i></span>
                            <div className="w-100"></div>
                            <span className="tertiary-logo-color fs-4 primary-logo-hover-color pointer" id="post_button"><i
                                className="fa-regular fa-paper-plane"></i></span>
                        </div>
                    </div>
                </div>

                <div className="row background-secondary py-2 mt-3" id="post_1">
                    <div className="col-12">
                        <div className="row px-3">
                            <div className="col-1 text-start p-0">
                                <i className="fa-regular fa-circle-user color-primary fs-1"></i>
                            </div>
                            <div className="col-6 text-start ms-2 ms-lg-3 p-0 align-self-center">
                                <span className="color-primary">
                                    cristian.leoncini
                                </span>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-12 p-0 color-primary">
                                <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure a molestiae dignissimos nostrum? Aperiam nesciunt voluptatem ducimus perferendis maxime nisi nam temporibus ipsa recusandae! Pariatur praesentium cum voluptate optio quia.</span>
                            </div>
                        </div>
                        <div className="row mt-1">
                            <div className="col-1 me-3 ps-3 pe-0 text-start">
                                <span className="color-primary tertiary-logo-hover-color fs-lg-3 fs-1 fw-light pointer"><i
                                    className="fa-regular fa-heart"></i></span>
                            </div>
                            <div className="col-2 text-start">
                                <span className="color-primary tertiary-logo-hover-color fs-lg-3 fs-1 fw-light pointer"><i
                                    className="fa-regular fa-comment"></i></span>
                            </div>
                        </div>
                        <div className="row mt-1">
                            <div className="col-12 ps-3 pe-0 text-start">
                                <span className="color-primary fs-6 fw-bold pointer">25 likes</span>
                            </div>
                        </div>
                        <div className="row mt-1">
                            <div className="col-12 ps-3 pe-0 text-start">
                                <span className="color-primary fs-6 fw-bold pointer">cristian.leoncini&nbsp;&nbsp;</span>
                                <span className="color-primary fs-6">São Paulo</span>
                            </div>
                        </div>
                        <div className="row mt-1">
                            <div className="col-12 ps-3 pe-0 text-start">
                                <span className="color-quaternary fs-6 pointer">See all 2 comments</span>
                            </div>
                        </div>
                        <div className="row mt-1">
                            <div className="col-12 ps-3 pe-0 text-start">
                                <span className="color-quaternary fs-10">2022/10/21 at 2pm</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <LoadingOverlay loading={loading} />
        </div >
    )
}

export default Home