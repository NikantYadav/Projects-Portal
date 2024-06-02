import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useCookies } from 'react-cookie'
import Navbar from '../components/navbar/navbar'




const Dashboards =  () => { 
    
    const navigate = useNavigate()
    const [cookies] = useCookies(['auth'])

    useEffect(() => {
        const Auth = async () => {
            const token = cookies.auth; 
            if (token) {
                try {
                    const response = await fetch('http://localhost:3001/auth/token', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ token }),
                    });
                    const data = await response.json()
                    if (data.auth === true && data.type === 'student') {
                        console.log('Successfully authenticated')
                    } else {
                        console.log({ error: data.error })
                        navigate('/')
                    }
                } catch (error) {
                    console.log('Error:', error)
                    navigate('/')
                }
            } else {
                navigate('/')
            }
        }

        Auth();
    }, [cookies.auth, navigate]);



    return(
        <div className='navigationbar'>
            <Navbar />
        </div>
    )
}


export default Dashboards
