import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../Contexts/ContextProvider'

const GuestLayout = () => {
  const { token } = useStateContext()
  if (token) {
    return <Navigate to="/users" />
  }
  return (
    <div className="login-signup-form animated fedeInDown">
      <div className="form">
        <Outlet />
      </div>{' '}
    </div>
  )
}

export default GuestLayout
