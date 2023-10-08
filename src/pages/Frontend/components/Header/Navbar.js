import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from "../../../../context/AuthContext";
import { auth } from "../../../../config/firebase"
import { signOut } from 'firebase/auth'


export default function Navbar() {

  const { isAuthenticated, dispatch } = useContext(AuthContext)


  const handleLogout = () => {
    signOut(auth)
      .then(() => {

        dispatch({ type: "LOGOUT" })
        alert("logged out")
      })
      .catch(err => {
        console.error(err)
      })
  }
  return (
    <>

      <nav className="navbar navbar-expand-lg bg-white navbar-light">
        <div className="container">
          <Link to="/" className="navbar-brand">Navbar</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link active">Home</Link>
              </li>
              {/* <li className="nav-item">
                <Link to="/todos" className="nav-link">Todos</Link>
              </li> */}
              <li className="nav-item">
                <Link to="/about" className="nav-link">About</Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link">Contact</Link>
              </li>
            
            </ul>
            <div className="d-flex">
              {!isAuthenticated
                ? <Link to="/authentication/login" className="btn btn-success text-white">Login</Link>

                : <>
                  <Link to="/todos" className="btn btn-info btn-sm me-2">Dashboard</Link>
                  <button className='btn btn-danger btn-sm' onClick={handleLogout}>Logout</button>
                </>
              }
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
