import { AuthContext } from '../../../context/AuthContext'
import React, { useContext } from 'react'
import Login from '../../Authentication/Login'

export default function PrivateRoute(props) {

    const {isAuthenticated}= useContext (AuthContext)



    const {Component} =props

    if (!isAuthenticated)
    return <Login/>
  return (
<Component/>
  )
}
