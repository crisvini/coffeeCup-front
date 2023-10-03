import { Link, NavLink } from "react-router-dom"

const Navbar = () => {
    return (
        <nav>
            <NavLink to='/'>Login</NavLink>
            <NavLink to='/home'>Home</NavLink>
        </nav>
    )
}

export default Navbar