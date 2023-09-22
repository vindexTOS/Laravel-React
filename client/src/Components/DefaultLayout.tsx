import React, { useEffect } from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../Contexts/ContextProvider'
import axiosClient from '../axios-client'

const DefaultLayout = () => {
  const { user, token, setUser, tokenSet } = useStateContext()

  if (!token) {
    return <Navigate to="/login" />
  }
  const onLogout = (e: any) => {
    e.preventDefault()
    axiosClient.post('/logout').then(() => {
      setUser({})
      tokenSet(null)
    })
  }
  useEffect(() => {
    axiosClient.get('/user').then(({ data }) => {
      setUser(data)
    })
  }, [])
  return (
    <div id="defaultLayout">
      <aside>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/users">users</Link>
      </aside>
      <div className="content">
        <header>
          <div>header</div>
          <div>
            {user.name}
            <a href="#" onClick={(e) => onLogout(e)} className="btn-logout">
              logout
            </a>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DefaultLayout
