import { Link } from "react-router-dom"

const Discussion = ({ data }) => {
    console.log(data);
    return (
        <div className="row background-secondary mt-3 rounded-lg-3 py-2 px-2">

            <div className="col-12 px-lg-0 mb-1">
                <div className="row">
                    <div className="col-12 col-lg-8">
                        <span className="color-primary"><Link to='/profile/39' className="fw-bold primary-link-color">crisvini.leoncini</Link> published a discussion</span>
                    </div>
                    <div className="col-12 col-lg-4 text-lg-end">
                        <button className="btn btn-sm quaternary-logo-button-color"><i class="bi bi-hand-thumbs-up"></i></button>
                        <button className="ms-2 btn btn-sm primary-logo-button-color">Follow</button>
                    </div>
                </div>
            </div>
            <div className="col-12 px-lg-0 mb-1">
                <span className="color-tertiary fs-1">How to create a hook in react?</span>
            </div>
            <div className="col-12 px-lg-0 mb-1">
                <span className="color-tertiary fs-6">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti omnis voluptatem, accusantium veritatis fuga corporis esse! Vel praesentium officia qui totam, soluta aut cum, distinctio minus quae voluptate corporis quod!
                    Necessitatibus optio iusto, sapiente, autem ipsam repellendus ducimus minus atque ipsa laudantium numquam dolore libero ea corrupti quam facilis consectetur id possimus itaque accusamus fugiat laborum eum dicta placeat! Repudiandae?
                    Reprehenderit delectus fugiat laboriosam et officia? Modi, facere beatae, unde deserunt distinctio perspiciatis, vero nisi ratione recusandae sed voluptatum facilis. Ab, nam cupiditate. Porro est architecto laboriosam cupiditate perferendis ex.</span>
            </div>
            <div className="col-12 px-lg-0 mb-1">
                <span className="color-quaternary fs-10">2022/10/21 at 2pm</span>
            </div>
        </div>
    )
}

export default Discussion