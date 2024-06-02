import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {  useCookies } from 'react-cookie'
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const Profregister = () => {
    
    const navigate = useNavigate()
    const [cookies, setCookie] = useCookies(['cookie-name'])
    const [selectedDepartment, setSelectedDepartment] = useState(null)

    const[name, setName] = useState('')
    const[email,setEmail] = useState('')
    const[address, setAddress] = useState('')
    const [password, setPassword] = useState('')


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
                    const data = await response.json();
                    if (data.auth === true && data.type === 'professor') {
                        console.log('Successfully authenticated');
                        navigate('/dashboardp')
                    } else {
                        console.log({ error: data.error });
                        //navigate('/');
                    }
                } catch (error) {
                    console.log('Error:', error);
                   // navigate('/');
                }
            } else {
               // navigate('/');
            }
        };

        Auth();
    }, [cookies.auth, navigate]);

    const handleDepartmentSelect = (department) => {
        setSelectedDepartment(department);
    };


    const onButtonClick = async (event) => {
        event.preventDefault()
        await Register()
    }

    const Register = async () => {
        console.log("Register function called.")
    
        try {
            const response = await fetch('http://localhost:3001/professor/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, department: selectedDepartment, type: 'professor', address }),
            });
            const data = await response.json();
            
            if (data.success) {
                console.log('Account created successfully')
                setCookie('auth', data.token, { path: '/' })
                console.log('Cookie set successfully')
                navigate('/dashboardp')
            } else {
                window.alert('Account creation failed! Try again');
                console.log('Account creation failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    


    return(
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4">
                <form>
                    <div className="mb-3 row">
                        <label htmlFor="inputName" className="col-sm-4 col-form-label">Name</label>
                        <div className="col-sm-8">
                            <input type="text" value={name} onChange={(ev) => setName(ev.target.value)}  className="form-control" id="inputName" required/>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="inputEmail" className="col-sm-4 col-form-label">Email Address</label>
                        <div className="col-sm-8">
                            <input type="email" value={email}  onChange={(ev) => setEmail(ev.target.value)} className="form-control" id="inputEmail" required/>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="departmentDropdown" className="col-sm-4 col-form-label">Select your department</label>
                        <div className="col-sm-8">
                            <DropdownButton id="departmentDropdown" title={selectedDepartment || "Select department"} className="w-100" required>
                            <Dropdown.Menu style={{ maxHeight: '200px', overflowY: 'auto' }}>
                            <Dropdown.Item onClick={() => handleDepartmentSelect('AE')}>AE</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleDepartmentSelect('BSBE')}>BSBE</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleDepartmentSelect('CHE')}>CHE</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleDepartmentSelect('CHM')}>CHM</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleDepartmentSelect('CE')}>CE</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleDepartmentSelect('CGS')}>CGS</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleDepartmentSelect('CSE')}>CSE</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleDepartmentSelect('DES')}>DES</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleDepartmentSelect('ES')}>ES</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleDepartmentSelect('ECO')}>ECO</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleDepartmentSelect('EE')}>EE</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleDepartmentSelect('HSS')}>HSS</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleDepartmentSelect('DOMS')}>DOMS</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleDepartmentSelect('MSE')}>MSE</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleDepartmentSelect('MTH')}>MTH</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleDepartmentSelect('ME')}>ME</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleDepartmentSelect('PHY')}>PHY</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleDepartmentSelect('SDS')}>SDS</Dropdown.Item>
                        </Dropdown.Menu>
                            </DropdownButton>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="inputAddress" className="col-sm-4 col-form-label">Office Address</label>
                        <div className="col-sm-8">
                            <input type="text" value={address} onChange={(ev) => setAddress(ev.target.value)} className="form-control" id="inputAddress" required/>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="inputPassword" className="col-sm-4 col-form-label">Create Password</label>
                        <div className="col-sm-8">
                            <input type="password" value={password} onChange={(ev) => setPassword(ev.target.value)} className="form-control" id="inputPassword" required/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4"></div>
                        <div className="col-sm-8">
                            <button type="submit" className="btn btn-primary w-100" onClick={onButtonClick} >Create New Account</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default Profregister