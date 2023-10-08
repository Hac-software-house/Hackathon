import React from 'react'
import { Link } from 'react-router-dom'
import Todos from '../Frontend/Todos'

export default function Home() {
  return (
    <div className='py-5'>

<div className="container ">
  <div className="row">
    <div className="col text-center">
      <h1> Dashboard</h1>
    <Link to="/"className='btn btn-success'>Home</Link>
    {<Todos/>}
    </div>
  </div>
</div>
    </div>
    )
}
