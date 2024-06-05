import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar/navbar';
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

const ProfileP = () => {

    const navigate = useNavigate()
    const [cookies] = useCookies(['auth'])

    const [profName, setProfName] = useState('')
    const [profDep, setProfDep] = useState('')
    const [profEmail, setProfEmail] = useState('')
    const [profAddress, setProfAddress] = useState('')
    const [profImage, setProfImage] = useState('')
    const [profAbout, setProfAbout] = useState('')
    const [profResearch, setProfResearch] = useState('')
    const [profHours, setProfHours] = useState('')

    const [newProfilePic, setNewProfilePic] = useState(null)
    const [editMode, setEditMode] = useState(false)

    const handleSave = async () => {
        try {
            const token = cookies.auth
            if (newProfilePic){
                const formData = new FormData()
                formData.append('file', newProfilePic)
                formData.append('token', token)

                const response = await fetch('http://localhost:3001/professor/pic/upload', {
                    method: 'POST', 
                    body: formData,
                })
                
                const data = await response.json()
                if(data.success === true) {
                    setProfImage(data.profileImageUrl)
                } else {
                    console.log('Profile picture update failed')
                }
            
            }
            
            const response = await fetch('http://localhost:3001/professor/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: token,
                    about: profAbout,
                    research: profResearch,
                    hours: profHours
                })
            })
            // if(!response.ok) {
            //     throw new Error('Failed to update profile')
            // }
            console.log('request sent')
            const data = await response.json()
            console.log('response received')
            if (data.success === true) {
                window.alert('Profile updated successfully!')
            } else {
                console.log('data.sucess is not true')
                window.alert('Profile update failed, please try again later.')
            }
        } catch (error) {
            console.log('error updating profile: ', error)
            window.alert('Profile update failed, please try again later.')
        }
    }

    const toggleEditMode = () => {
        if (editMode === true) {
            handleSave()
        }
        setEditMode(!editMode)
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onloadend = () => {
            setProfImage(reader.result)
            setNewProfilePic(file)
        }
        if (file) {
            reader.readAsDataURL(file)
        }
    }

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
                    })
                    const data = await response.json()
                    if (data.auth === true && data.type === 'professor') {
                        console.log('Successfully authenticated')
                        setProfName(data.name)
                        setProfDep(data.department)
                        setProfEmail(data.email)
                        setProfAddress(data.address)
                        setProfImage(data.profilePic)
                        if (!data.about) {
                            setProfAbout('Please write about yourself in this section')
                        } else { setProfAbout(data.about) }

                        if (!data.research) {
                            setProfResearch('Please fill your research interests here')
                        } else {
                            setProfResearch(data.research)
                        }

                        if (!data.hours) {
                            setProfHours('Please set your working hours')
                        } else {
                            setProfHours(data.hours)
                        }
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
        };

        Auth()
    }, [cookies.auth, navigate])


    return (
        <div>
            <div className='navigationbar'>
                <Navbar />
            </div>
            <div className="container" style={{ marginTop: '100px' }}>
                <div className="row gy-4 gy-lg-0">
                    <div className="col-12 col-lg-4 col-xl-3">
                        <div className="row gy-4">
                            <div className="col-12">
                                <div className="card widget-card border-light shadow-sm">
                                    <div className="card-header text-bg-secondary">{profName}</div>
                                    <div className="card-body">
                                        <div className="text-center mb-3 position-relative">
                                            <img src={profImage} className="img-fluid rounded-circle" alt="Profile" />
                                            {editMode && (
                                                <div className="edit-profile-icon">
                                                    <label htmlFor="profilePic" className="btn btn-primary btn-sm">
                                                        <i className="fas fa-pencil-alt"></i> Change Image
                                                    </label>
                                                    <input
                                                        type="file"
                                                        id="profilePic"
                                                        accept=".jpg, .jpeg, .png"
                                                        style={{ display: 'none' }}
                                                        onChange={handleImageChange}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <h5 className="text-center mb-1">{profName}</h5>
                                        <p className="text-center text-secondary mb-4">{profDep}</p>
                                        <ul className="list-group list-group-flush mb-4">
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                                <h6 className="m-0">Email Address</h6>
                                                <span>{profEmail}</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                                <h6 className="m-0">Office</h6>
                                                <span>{profAddress}</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                                <h6 className="m-0">Office Hours</h6>
                                                {editMode ? (
                                                    <textarea
                                                        className="form-control"
                                                        value={profHours}
                                                        onChange={(e) => setProfHours(e.target.value)}
                                                        style={{ height: '100%' }}
                                                    />
                                                ) : (
                                                    <span>{profHours}</span>
                                                )}

                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-8 col-xl-9">
                        <div className="card widget-card border-light shadow-sm">
                            <div className="card-body p-4">
                                <div className="tab-content pt-4" id="profileTabContent">
                                    <div className="tab-pane fade show active" id="overview-tab-pane" role="tabpanel" aria-labelledby="overview-tab" tabIndex={0}>
                                        <h5 className="mb-3">About</h5>
                                        {editMode ? (
                                            <textarea
                                                className="form-control"
                                                value={profAbout}
                                                onChange={(e) => setProfAbout(e.target.value)}
                                                style={{ height: '100%' }}
                                            />
                                        ) : (
                                            <p className="lead mb-3">{profAbout}</p>
                                        )}
                                        <button className="btn btn-primary" style={{ position: 'absolute', top: '7px', right: '5px' }} onClick={toggleEditMode}>
                                            {editMode ? 'Save' : 'Edit Profile'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ height: '50px' }}></div>
                        <div className="card widget-card border-light shadow-sm">
                            <div className="card-body p-4">
                                <div className="tab-content pt-4" id="profileTabContent">
                                    <div className="tab-pane fade show active" id="research-interest-tab-pane" role="tabpanel" aria-labelledby="research-interest-tab" tabIndex={0}>
                                        <h5 className="mb-3">Research Interests</h5>
                                        {editMode ? (
                                            <textarea
                                                className="form-control"
                                                value={profResearch}
                                                onChange={(e) => setProfResearch(e.target.value)}
                                                style={{ height: '100%' }}
                                            />
                                        ) : (
                                            <p className="lead mb-3">{profResearch}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ height: '50px' }}></div>
                        <div className="card widget-card border-light shadow-sm">
                            <div className="card-body p-4">
                                <h5 className="mb-3">Projects Offered</h5>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Project Name</th>
                                            <th scope="col">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Project 1</td>
                                            <td>In Progress</td>
                                        </tr>
                                        <tr>
                                            <td>Project 2</td>
                                            <td>Completed</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ProfileP;
