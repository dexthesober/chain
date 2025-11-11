import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../utils/auth'

export default function Login(){
  const [form,setForm]=useState({email:'',password:''})
  const nav = useNavigate()
  const submit = e =>{
    e.preventDefault()
    try{
      login(form)
      alert('Logged in')
      nav('/profile')
    }catch(err){ alert(err.message) }
  }
  return (
    <div className="card  p-4 bg-violet-500 rounded-3 shadow-lg">
      <h3>Login</h3>
      <form onSubmit={submit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input className="form-control" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
        </div>
        <button className="btn btn-primary ">Login</button>
      </form>
    </div>
  )
}
