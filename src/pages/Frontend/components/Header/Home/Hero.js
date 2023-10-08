import React, { useState, useContext } from 'react'
import { AuthContext } from '../../../../../context/AuthContext'
import { setDoc, serverTimestamp, doc } from 'firebase/firestore/lite'
import { firestore } from '../../../../../config/firebase'
const intialState = {
  name: "",
  email: "",
  course: "",
  number: ""
}
export default function Hero() {
  const { users } = useContext(AuthContext)
  const [state, setState] = useState(intialState)
  const [isProcessing, SetIsProcessing] = useState(false)

  const handleChange = e => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }))
  }
  const handleSubmit = e => {
    e.preventDefault();
    let { name, email, course,number } = state
    name = name.trim();
    email = email.trim();
    course = course.trim();
    number = number.trim();

    if (name.length < 3) {
      return window.notify("name length be short at chra 3!", "error");
    }
    if (email.length < 3) {
      return window.notify("Please enter email", "error");
    }
    if (course.length < 3) {
      return window.notify("Please enter course", "error");
    }
    if (number.length < 1) {
      return window.notify("Please enter number", "error");
    }


    let formData = { name, email, course,number }
    
    formData.dateCreated = serverTimestamp()
    formData.id = window.getRandomId()
    formData.status = "active"
    formData.createdBy = {
      email: users.email,
      uid: users.uid
    }
    console.log(formData);
    createDocument(formData)
  }
  const createDocument =async (formData) => {
    SetIsProcessing(true)
    try{
      
      await setDoc(doc(firestore, "todos", formData.id),formData);
      
      window.notify ("User has been added successfully", "success")
    }catch(err){
      console.error(err);
      window.notify ("something went wrong", "error")
  }
  SetIsProcessing(false)

  }
  return (
    <div className='py-5 home d-flex justify-content-center align-item-center'>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card p-3 p-md-4 p-lg-5">
              <form onSubmit={handleSubmit}>

                <div className="row">
                  <div className="col">
                    <h2 className="text-center mb-4">Add Students</h2>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-6 mb-3">
                    <input type="text" className='form-control' name='name' placeholder='Enter Name' onChange={handleChange} />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <input type="email" className='form-control' name='email' placeholder='Enter Email' onChange={handleChange} />
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col-12 col-md-6 mb-3">
                    <input name="course" className='form-control' placeholder='Enter Course'  onChange={handleChange} ></input>
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <input type='number' name="number" className='form-control' placeholder='Enter RollNumber'  onChange={handleChange} ></input>
                  </div>
                </div>

                <div className="row">
                  <div className="col text-center">
                    <button className='btn btn-danger w-100' disabled={isProcessing} >

                      {
                        !isProcessing ? "Add Student"
                          : <div className="spinner-border spinner-border-sm"></div>
                      }
                    </button>
                  </div>
                </div>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
