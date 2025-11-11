/** Simple localStorage-based user store for demo purposes.
 *  - Users stored under key 'ra_users' as array of {id, name, email, password, country}
 *  - Authenticated user id stored under 'ra_auth'
 */
import { uuidv4 } from './uuid'

const USERS_KEY = 'ra_users'
const AUTH_KEY = 'ra_auth'

export function loadUsers(){
  try{ return JSON.parse(localStorage.getItem(USERS_KEY) || '[]') }catch{ return [] }
}
export function saveUsers(u){ localStorage.setItem(USERS_KEY, JSON.stringify(u)) }

export function register({name,email,password,country}){
  const users = loadUsers()
  if(users.find(x=>x.email.toLowerCase()===email.toLowerCase())){
    throw new Error('Email already registered')
  }
  const user = { id: uuidv4(), name, email, password, country }
  users.push(user)
  saveUsers(users)
  localStorage.setItem(AUTH_KEY, user.id)
  return user
}

export function login({email,password}){
  const users = loadUsers()
  const user = users.find(x=>x.email.toLowerCase()===email.toLowerCase() && x.password===password)
  if(!user) throw new Error('Invalid credentials')
  localStorage.setItem(AUTH_KEY, user.id)
  return user
}

export function getAuthUser(){
  const id = localStorage.getItem(AUTH_KEY)
  if(!id) return null
  const users = loadUsers()
  return users.find(x=>x.id===id) || null
}

export function logout(){ localStorage.removeItem(AUTH_KEY) }

export function updateProfile({id,name,country,password}){
  const users = loadUsers()
  const idx = users.findIndex(x=>x.id===id)
  if(idx===-1) throw new Error('User not found')
  if(name!==undefined) users[idx].name = name
  if(country!==undefined) users[idx].country = country
  if(password) users[idx].password = password
  saveUsers(users)
  return users[idx]
}
