import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../axios-client'
import { useStateContext } from '../Contexts/ContextProvider'
function Signup() {
  const nameRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null)
  const [error, setError] = useState(null)
  const { setUser, tokenSet } = useStateContext()

  const onSubmit = (e: any) => {
    e.preventDefault()
    const payload = {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      password_confirmation: confirmPasswordRef.current.value,
    }
    axiosClient
      .post('/signup', payload)
      .then(({ data }) => {
        setUser(data.user)
        tokenSet(data.token)
        console.log(data)
      })
      .catch((err) => {
        const res = err.response

        if (res && res.status === 422) {
          setError(res.data.errors)
          console.log(res.data.errors)
        }
      })
  }
  return (
    <form onSubmit={onSubmit}>
      <h1 className="title">Sing up for free</h1>
      {error && (
        <div className="alert">
          {Object.keys(error).map((key) => (
            <p key={key}>{error[key][0]}</p>
          ))}
        </div>
      )}
      <input ref={nameRef} placeholder="full name" type="text" />
      <input ref={emailRef} placeholder="email address" type="email" />
      <input ref={passwordRef} placeholder="password" type="password" />
      <input
        ref={confirmPasswordRef}
        placeholder="password conformation"
        type="password"
      />
      <button className="btn btn-block">Sign up</button>
      <p className="message">
        already Registered ? <Link to="/login">login</Link>
      </p>
    </form>
  )
}

export default Signup
