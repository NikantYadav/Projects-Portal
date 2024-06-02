import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import { IoClose, IoMenu } from "react-icons/io5"

const Navbar = () => {
    const[showMenu, setShowMenu] = useState(false)

    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }

    return(
        <header className="header">

        <nav className="navbar navbar-expand-lg cornflowerblue">
        <div className="container-fluid">
            <a className="navbar-brand">IITK Projects Portal</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto" style={{marginRight: "30px"}}> 
                <li className="nav-item">
                <a className="nav-link active text-light" aria-current="page" href="/">Home</a>
                </li>
                <li className="nav-item">
                <a className="nav-link active text-light" href="#">My Projects</a>
                </li>
                <li className="nav-item">
                <a className="nav-link active text-light" href="#">Post a Project</a>
                </li>
                <li className="nav-item">
                <a className="nav-link active text-light" href="#">Profile</a>
                </li>
            </ul>
            </div>
        </div>
        </nav>
        </header>
    )
}

export default Navbar;