import React from 'react'
import {useNavigate} from 'react-router-dom'

const Home = (props) => {
    const {loggedIn, email} = props
    const navigate = useNavigate()

    const onButtonClick = () => {
        navigate('/login')
    }

    return(
        
        <div className="main-container d-flex justify-content-center align-items-center h-500 p-3">
            <header className="masthead mb-auto">
                <main role="main " className="inner cover">
                    <h1 className = "main-heading ">IITK Projects Portal</h1>
                    <p className="main-subheading ">A platform connecting professors and students</p>
                    <div className="d-flex">
                    <p className="register-button">
                        <a href="/register" className="btn btn-lg btn2-cornflower-blue"> Register</a>
                    </p>
                    <p className="login-button">
                        <a href="/login" className="btn btn-lg btn1-cornflower-blue">Login</a>
                    </p>
                    
                    </div>
                </main>
            </header>
        </div>


    )
}

export default Home