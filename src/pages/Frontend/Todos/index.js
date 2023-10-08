import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { collection, deleteDoc, doc, getDocs, serverTimestamp, setDoc, where, query } from 'firebase/firestore/lite'
import { firestore } from '../../../config/firebase'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';



export default function Todos() {
  const { users } = useContext(AuthContext)
  const [documents, setDocuments] = useState([])
  const [todo, setTodo] = useState({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [isProcessingDelete, setIsProcessingDelete] = useState(false)
  const [isLoading, SetIsloading] = useState(true)
  console.log(users)


  const handleChange = e => {
    setTodo(s => ({ ...s, [e.target.name]: e.target.value }))
  }




  const fetchDocument = async () => {
    let array = []

    const q = query(collection(firestore, "todos"), where("createdBy.uid", "==", users.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let data = doc.data()

      array.push(data);
    });

    setDocuments(array)
    SetIsloading(false)
  }

  useEffect(() => {
    fetchDocument()
  }, [users])

  const handleupdate = async () => {
    console.log(todo);
    let formData = { ...todo }
    formData.dateCreated = formData.dateCreated
    formData.dateModified = serverTimestamp()

    formData.modified = {
      email: users.email,
      uid: users.uid
    }
    setIsProcessing(true)
    console.log(formData);
    try {
      await setDoc(doc(firestore, "todos", formData.id), formData, { merge: true });
      window.notify("User has been updated ", "success")

      let newDocuments = documents.map((doc) => {
        if (doc.id === todo.id)
          return todo
        return doc
      })
      setDocuments(newDocuments)

    } catch (err) {
      console.error(err);
      window.notify("User isn't updated", "error")
    }
    setIsProcessing(false)

  }

  const handleDelete = async (todo) => {
    setIsProcessingDelete(true)
    try {
      await deleteDoc(doc(firestore, "todos", todo.id))
      window.notify("User has been delete ", "error")

      let newDocuments = documents.filter((doc) => {
        return doc.id !== todo.id
      })
      setDocuments(newDocuments)
    }
    catch (err) {
      console.error(err);
      window.notify("something went wrong ", "error")
    }
    setIsProcessingDelete(false)
  }

  return (
    <>
      <div className='py-5 home d-flex justify-content-center align-item-center'>
        <div className="container">
          <div className="row">
            <div className="col">
              <h2 className="text-center mb-4">User</h2>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="card p-3 p-md-4 p-lg-5">
                {!isLoading
                  ? <Table>
                    <Thead>
                      <Tr>
                        <Th>S.No</Th>
                        <Th>Name</Th>
                        <Th>Email</Th>
                        <Th>Course</Th>
                        <Th>Status</Th>
                        <Th>Action</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {documents.map((todo, i) => {
                        // console.log(todo);
                        return <Tr key={i}>
                          <Td>{i + 1}</Td>
                          <Td>{todo.name}</Td>
                          <Td>{todo.email} </Td>
                          <Td>{todo.course} </Td>
                          <Td>{todo.status} </Td>
                          <Td>
                            <button className='btn btn-info btn-sm me-2  mb-2' data-bs-toggle="modal" data-bs-target="#editModal" onClick={() => { setTodo(todo) }}>
                              {!isProcessing
                                ? "Edit"
                                : <div className='spinner-border spinner-border-sm'></div>
                              }
                            </button>
                            <button className='btn btn-danger btn-sm mb-2' disabled={isProcessingDelete} onClick={() => { handleDelete(todo) }}>
                              {!isProcessingDelete
                                ? "Delete"
                                : <div className='spinner-border spinner-border-sm mb-2'></div>
                              }
                            </button>

                          </Td>
                        </Tr>

                      })}
                    </Tbody>
                  </Table>
                  :

                  <div className="text-center"> <div className="spinner-grow"></div></div>
                }

              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="modal fade" id="editModal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update User</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              <div className="row">
                <div className="col-12 col-md-6 mb-3">
                  <input type="text" className='form-control' name='title' placeholder='Enter Title' value={todo.title} onChange={handleChange} />
                </div>
                <div className="col-12 col-md-6 mb-3">
                  <input type="text" className='form-control' name='location' placeholder='Enter Location' value={todo.location} onChange={handleChange} />
                </div>
              </div>
              <div className="row">
                <div className="col mb-3">
                  <textarea name="description" className='form-control' placeholder='Enter Description' value={todo.description} rows="5" onChange={handleChange} ></textarea>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <select name="status" className='form-control' value={todo.status} onChange={handleChange}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>



            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={handleupdate} >Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
