import React, { useContext, useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth"
import { Link } from "react-router-dom"
import { auth } from '../../../config/firebase'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext'

const intialState = { email: "", password: "" }

export default function Login() {
  const {dispatch}= useContext(AuthContext)
  const navigate=useNavigate()
  const [state, setState] = useState(intialState)
  const [isProcessing, setIsProcessing] = useState(false)
  const handleChange = e => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }))
  }
  const handleLogin = (e) => {
    e.preventDefault();

    let { email, password } = state
    console.log(state)

    setIsProcessing(true)
    signInWithEmailAndPassword(auth,email, password,)
      .then((userCredential) => {
        let user = userCredential.user
        console.log(user)
dispatch({type: "LOGIN",payload:{user}})

        navigate("/dashboard")
      })
      .catch(err => {
        console.error(err)
      })
      .finally(() => {
        setIsProcessing(false)
      })

  }
  return (
    <>
      <div className="auth">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
              <div className="card p-2 p-md-3 p-lg-4">
                <div className="row">
                  <div className="col">
                    <h3 className='mb-3'>LOGIN</h3>
                    <form onSubmit={handleLogin}>

                      <div className="row">
                        <div className="col mb-3">
                          <label htmlFor="email">Email</label>
                          <input type="text" className='form-control' placeholder='Email' name='email' onChange={handleChange} />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col mb-3">
                          <label htmlFor="password">Password</label>
                          <input type="text" className='form-control' placeholder='Password' name='password' onChange={handleChange} />
                        </div>
                      </div>
                      <div className="row ">
                        <div className="col">
                          <button className='btn w-100' disabled={isProcessing}>
                            {!isProcessing
                              ? "Login"
                              : <div className='spinner-grow spinner-grow-sm'></div>
                            }
                          </button>
                        </div>
                      </div>
                    </form>
                    <div className="row mt-3">
                      <div className="col">
                        <p className="mb-0 text-center">Need an account? <Link to="/authentication/register" className=" text-dark">Register</Link></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
