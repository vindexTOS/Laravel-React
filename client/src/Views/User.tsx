import React, { useState, useEffect } from 'react'
import axiosClient from '../axios-client'
import { Link } from 'react-router-dom'

export default function User() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = () => {
    setLoading(true)

    axiosClient
      .get('/users')
      .then(({ data }) => {
        console.log(data)
        setUsers(data.data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1>Users</h1>
        <Link className="btn-add" to="users/new">
          Add new
        </Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>Ids</th>
              <th>Name</th>
              <th>Email</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((val: any) => {
              return (
                <tr key={val.id}>
                  <td>{val.id}</td>
                  <td>{val.name}</td>
                  <td>{val.email}</td>
                  <td>{val.created_at}</td>
                  <td>
                    <Link to={'/users/' + val.id}>Edit</Link>
                    <button
                      onClick={() => console.log('deltes')}
                      className="btn-delete"
                    >
                      Delte
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
