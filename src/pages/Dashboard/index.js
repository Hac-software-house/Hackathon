import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import Todo from './Todo'
export default function index() {
  return (
    <Routes>
      <Route path='/'>

        <Route path='/' element={<Home />} />
        <Route path='todo' element={<Todo />} />

      </Route>

    </Routes>
  )
}
