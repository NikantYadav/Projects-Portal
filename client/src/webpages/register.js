import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {useCookies } from 'react-cookie'

const Register = (props) => {

    const navigate = useNavigate()

    

    return(
        <div className='main-container d-flex justify-content-center align-items-center h-500 p-3'>
            <header className="masthead mb-auto">
                <main role="main " className="inner cover">
                    <h1 className = "main-heading mb-4">How do you want to use this portal?</h1>
                    <div className='d-flex'>
                    <p className="professor-button">
                        <a href="/register/professor" className="btn btn-lg btn2-cornflower-blue">Professor</a>
                    </p>
                    <p className="login-button">
                        <a href="/register/student" className="btn btn-lg btn1-cornflower-blue">Student</a>
                    </p>
                    </div>
                    </main>
            </header>
        </div>
    )

}

export default Register