import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../axios-client'
import { useStateContext } from '../Contexts/ContextProvider'

const Login = () => {
  const [error, setError] = useState()
  const { setUser, tokenSet } = useStateContext()
  const emailRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)
  const onSubmit = (e: any) => {
    e.preventDefault()
    const payload = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    }
    axiosClient
      .post('/login', payload)
      .then(({ data }) => {
        setUser(data.user)
        tokenSet(data.token)
      })
      .catch((err) => {
        const res = err.response

        if (res && res.status === 422) {
          setError(res.data.message)
          console.log(res.data.message)
        }
      })
  }

  return (
    <form onSubmit={onSubmit}>
      <h1 className="title">Login in to your accoutn</h1>
      {error && <div className="alert">{error}</div>}
      <input ref={emailRef} placeholder="email" type="email" />
      <input ref={passwordRef} placeholder="password" type="password" />
      <button className="btn btn-block">Login</button>
      <p className="message">
        Not Registered <Link to="/signup">Singu p</Link>
      </p>
    </form>
  )
}

export default Login
