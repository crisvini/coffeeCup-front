import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

import useHttpRequest from '../hooks/useHttpRequest'

import PageTitle from "../components/PageTitle"
import LoadingOverlay from '../components/LoadingOverlay'
import Header from "../components/Header"

const Home = () => {
    const navigate = useNavigate()
    const MySwal = withReactContent(Swal)

    const [title, setTitle] = useState()
    const [body, setBody] = useState()

    const { loading, sendRequest } = useHttpRequest()

    const handleDiscussionSubmit = (e) => {
        e.preventDefault()
        console.log('handleDiscussionSubmit')
    }

    return (
        <div className="background-quaternary vh-100">
            <PageTitle title='Home' />
            <Header />

            <main className="container h-100 mt-3">
                <form className="row background-secondary rounded-lg-3 py-2 px-2" onSubmit={handleDiscussionSubmit}>
                    <div className="col-12 px-lg-0 mb-3">
                        <span className="color-primary ps-lg-0 mb-2">Why not start a new discussion?</span>
                    </div>
                    <div className="col-12 px-lg-0">
                        <input required type="text" className="form-control background-secondary color-quaternary mb-2" id="title"
                            placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}></input>
                        <textarea className="form-control rounded-3 background-secondary color-quaternary mb-2"
                            placeholder="Body" value={body} required onChange={(e) => setBody(e.target.value)}></textarea>
                    </div>
                    <div className="ms-auto col-12 col-lg-2 px-lg-0">
                        <input className="form-control btn primary-logo-button-color" type="submit" value='Send' />
                    </div>
                </form>

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