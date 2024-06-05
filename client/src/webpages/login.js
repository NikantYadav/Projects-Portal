import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {  useCookies } from 'react-cookie'

const Login = (props) => {                  
    const [email, setEmail] = useState('')      
    const [password, setPassword] = useState('')        
    const [emailError, setEmailError] = useState('')        
    const [passwordError, setPasswordError] = useState('')  
    const [cookies, setCookie] = useCookies(['cookie-name'])

    const navigate = useNavigate()


    useEffect(() => {
        const Auth = async () => {
            const token = cookies.auth
            if (token) {
                try {
                    const response = await fetch('http://localhost:3001/auth/token/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ token }),
                    })
                    const data = await response.json()
                    if (data.auth === true) {
                        console.log('Successfully authenticated')
                        if (data.type === 'student') {navigate('/dashboards') }
                        else if (data.type ==='professor') {
                            navigate('/dashboardp')
                        }
                    } else {
                        console.log({ error: data.error })
                    }
                } catch (error) {
                    console.log('Error:', error)
                }
            } else {
            }
        }

        Auth()
    }, [cookies.auth, navigate])


    const onButtonClick = (event) => {
        event.preventDefault()
        setEmailError('')
        setPasswordError('')

        if('' === email) {
            setEmailError('Please enter your email')
            return
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError('Please enter a valid email')
            return
          }

        if ('' === password) {
            setPasswordError('Please enter a password')
            return
        }

        if (password.length < 3) {
            setPasswordError('The password must be 8 characters or longer')
            return
        }

        Loginfunc()
    }


    const Loginfunc = async () => {
        console.log('Login function called')
        try{
            const response = await fetch('http://localhost:3001/login/verify', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
            .then((r) => r.json())
            .then((r) => {
            if (true === r.success) {
                console.log('32')
                localStorage.setItem('user', JSON.stringify({ email, token: r.token, type: r.type }))
                if(r.type !== 'professor'){
                    navigate('/dashboards')
                    console.log('Authentication successful')
                } else {
                    navigate('/dashboardp')
                    console.log('Authentication successful')
                }
                setCookie('auth',r.token, { path: '/' })
                //setCookie('type', r.type, { path: '/' })
            } else {
                window.alert('Wrong email or password')
            }
            })
            } catch (error) {
                console.error('Error:', error)
            }
        }

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <form>
                <div className='mb-3'>
                    <label htmlFor='inputEmail' className='form-label'>Email Address</label>
                    <input type='email' value={email} onChange={(ev) => setEmail(ev.target.value)} className='form-control' id='inputEmail' />
                </div>
                <div className='mb-3'>
                    <label htmlFor='inputPassword' className= 'form-label'>Password</label>
                    <input type='password' value={password} onChange={(ev) => setPassword(ev.target.value)} className='form-control' id='inputPassword' />
                </div>
                <button type='submit' className='btn btn-primary' onClick={onButtonClick}>Login</button>
            </form>
        </div>
    )
}

export default Login