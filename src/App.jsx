import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'
import { getAuthUser, logout } from './utils/auth'

export default function App(){
  const user = getAuthUser()
  return (
    <div>
      <nav className="navbar navbar-expand rounded-3 bg-white shadow-sm">
        <div className="container">
          <Link className="navbar-brand" to="/">My App</Link>
          <div className='dj'>
          <button className="butt"> <Link className="nav-link d-inline me-2 " to="/">Home</Link></button>
           <button className="butt">  {!user && <Link className="nav-link d-inline me-2 " to="/login">Login</Link>}</button>

           <button className="butt">  {!user && <Link className="nav-link d-inline me-2" to="/register">Register</Link>}</button>
            
           {user && <Link className="nav-link d-inline me-2" to="/profile">My Account</Link>}

           {user && <button className="btn btn-outline-secondary btn-sm" onClick={()=>{ logout(); alert('You have been logged out!'); window.location.href='/login' }}>Logout</button>}
          </div>
        </div>
      </nav>
      <main className="container py-4">
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/profile' element={<Profile/>} />
        </Routes>
      </main>
    </div>
  )
}
