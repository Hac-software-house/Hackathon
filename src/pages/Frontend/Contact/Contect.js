import React from 'react'
import { Link } from 'react-router-dom'
export default function Contect() {
  return (
    <div className="container">
      <div className='col-sm-12 col-md-8 col-lg-6 offset-lg-3 offset-md-2'>

        <h1 className='text-center fw-bold mt-3'>
          Muhammad Mubashar
        </h1>
        <div className='text-center fw-bold'>
          <h1 className='text-center mt-4'>Contact No :</h1>
          <h4>
            <a className='text-danger' href="tel:+923415682652">03415682652</a>
          </h4>
        </div>
        <p className='text-center'>Contact US:</p>
        <br />
        <div className='mt-5 text-center'>
          <Link to="/" className='btn btn-success'>Home</Link>
        </div>
      </div>
    </div>
  )
}
