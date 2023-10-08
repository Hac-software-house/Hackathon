import React, { useState, useContext } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { Link } from "react-router-dom"
import { doc, setDoc } from 'firebase/firestore/lite'
import { auth, firestore } from '../../../config/firebase'
import { AuthContext } from "../../../context/AuthContext"
const intialState = { email: "", password: "", userName: '' }

export default function Register() {

  const { dispatch } = useContext(AuthContext)
  const [state, setState] = useState(intialState)
  const [isProcessing, setIsProcessing] = useState(false)
  const handleChange = e => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }))
  }
  const handleRegister = e => {
    e.preventDefault();
    let { email, password, userName } = state;
    console.log(state)

    setIsProcessing(true)
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        user.displayName = userName;
        let user = userCredential.user
        console.log("user created");
        addDocument(user)
      })

      .catch(err => {
        console.error(err)
        setIsProcessing(false)
      })

  }
  const addDocument = async (user) => {

    try {

      await setDoc(doc(firestore, "users", user.uid), {
        firstName: "",
        lastName: "",
        uid: user.uid
      });
      console.log("user document created at firestore");
      dispatch({ type: "LOGIN", payload: { user } })
    }
    catch (err) {

      console.error(err)
    }
    setIsProcessing(false)

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
                    <h3 className='mb-3'>Register</h3>
                    <form onSubmit={handleRegister}>

                      <div className="row">
                        <div className="col mb-3">
                          <label htmlFor="Name">Name</label>
                          <input type="text" className='form-control' placeholder='Name' name='userName' id='Name' onChange={handleChange} />
                        </div>
                      </div>
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
                      <div className="row">
                        <div className="col">
                          <button className='btn w-100' disabled={isProcessing}>
                            {!isProcessing
                              ? "Register"
                              : <div className='spinner-grow spinner-grow-sm'></div>
                            }
                          </button>
                        </div>
                      </div>
                    </form>
                    <div className="row mt-3">
                      <div className="col">
                        <p className="mb-0 text-center">Alredy have an account? <Link to="/authentication/login" className=" text-dark">Login</Link></p>
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



