import './App.css';
import Home from './webpages/home.js'
import Login from './webpages/login.js'
import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboardp from './webpages/dashboardp.js';
import Dashboards from './webpages/dashboards.js';
import Register from './webpages/register.js';
import Profregister from './webpages/profregister.js';
import Studregister from './webpages/studregister.js';
import ProfileP from './webpages/profilep.js';


function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState('')

  return (
    <div className='App'>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
      <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
      <Route path="/dashboardp" element={<Dashboardp/ >}></Route>
      <Route path="/dashboards" element={<Dashboards/ >}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/register/professor" element={<Profregister/>}></Route>
      <Route path="/register/student" element={<Studregister />}></Route>
      <Route path="/professor/profile" element={<ProfileP />}></Route>
      </Routes>
      </BrowserRouter>
    </div>


  )
}

export default App;
